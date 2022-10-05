import { validate } from "uuid";
import { Message } from "../../models/Message/Message";
import { MessageDTO } from "../../dto/MessageDTO";
import { BadRequestError, NotFoundError } from "../../utils/Errors";
import { MessageRepository } from "../../repositories/Message/MessageRepository";
import { UserRepository } from "../../repositories/User/UserRepository";
import { notFound } from "../../utils/Functions";
import { GroupRepository } from "../../repositories/Group/GroupRepository";
import { RabbitMQRepository } from "../../messaging/RabbitMQ";
import { IMessageService } from "./IMessageService";
import {
  INVALID_UUID,
  NO_MESSAGES_FOR_GROUP,
  NO_MESSAGES_FOR_USER,
  Properties,
} from "../../utils/Constants";

export class MessageService implements IMessageService {
  constructor(
    private messageRepository: MessageRepository,
    private userRepository: UserRepository,
    private groupRepostiory: GroupRepository,
    private rabbitMQRepository: RabbitMQRepository
  ) {
    this.rabbitMQRepository.connect();
  }

  async findById(id: string): Promise<Message> {
    if (!validate(id)) {
      throw new BadRequestError(INVALID_UUID);
    }

    const message = await this.messageRepository.findById(id);

    if (!message) {
      throw new NotFoundError(notFound(Properties.MESSAGE));
    }

    return message;
  }

  async findByUser(username: string): Promise<Message[]> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundError(notFound(Properties.USER));
    }

    const messages = await this.messageRepository.findByUser(username);

    if (messages.length === 0) {
      throw new NotFoundError(NO_MESSAGES_FOR_USER);
    }

    return messages;
  }

  async findByGroup(id: string): Promise<Message[]> {
    if (!validate(id)) {
      throw new BadRequestError(INVALID_UUID);
    }

    const group = await this.groupRepostiory.findById(id);

    if (!group) {
      throw new NotFoundError(notFound(Properties.GROUP));
    }

    const messages = await this.messageRepository.findByGroup(id);

    if (messages.length === 0) {
      throw new NotFoundError(NO_MESSAGES_FOR_GROUP);
    }

    return messages;
  }

  async saveMessage(messageDTO: MessageDTO): Promise<void> {
    const foundSender = await this.userRepository.findByUsername(
      messageDTO.sender
    );

    if (!foundSender) {
      throw new BadRequestError(notFound(Properties.SENDER));
    }

    const foundReceiver =
      (await this.userRepository.findByUsername(messageDTO.receiver)) ||
      (await this.groupRepostiory.findById(messageDTO.receiver));

    if (!foundReceiver) {
      throw new BadRequestError(notFound(Properties.RECEIVER));
    }

    const message = new Message(
      messageDTO.id,
      messageDTO.sender,
      messageDTO.receiver,
      messageDTO.content,
      messageDTO.timestamp,
      false,
      messageDTO.type
    );

    await this.messageRepository.save(message);

    if (foundReceiver.hasOwnProperty("avatar")) {
      await this.rabbitMQRepository.publishToQueue(
        message.receiver,
        JSON.stringify(message)
      );
    }

    if (foundReceiver.hasOwnProperty("image")) {
      await this.rabbitMQRepository.publishToExchange(
        message.receiver,
        JSON.stringify(message)
      );
    }
  }

  async sendMessage(messageDTO: MessageDTO): Promise<void> {
    const foundSender = await this.userRepository.findByUsername(
      messageDTO.sender
    );

    if (!foundSender) {
      throw new BadRequestError(notFound(Properties.SENDER));
    }

    const foundReceiver = await this.userRepository.findByUsername(
      messageDTO.receiver
    );

    if (!foundReceiver) {
      throw new BadRequestError(notFound(Properties.RECEIVER));
    }

    const message =
      messageDTO.content === "new-chat"
        ? JSON.stringify({
            username: foundSender.username,
            avatar: foundSender.avatar,
          })
        : JSON.stringify(messageDTO.content);

    await this.rabbitMQRepository.publishToQueue(
      foundReceiver.username,
      message
    );
  }

  async setReceived(id: string): Promise<void> {
    if (!validate(id)) {
      throw new BadRequestError(INVALID_UUID);
    }

    const message = await this.messageRepository.findById(id);

    if (!message) {
      throw new NotFoundError(notFound(Properties.MESSAGE));
    }

    await this.messageRepository.update(message);
  }
}
