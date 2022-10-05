import { validate, v4 as uuid } from "uuid";
import { ChatDTO } from "../../dto/ChatDTO";
import { Chat } from "../../models/Chat/Chat";
import { ChatRepository } from "../../repositories/Chat/ChatRepository";
import { UserRepository } from "../../repositories/User/UserRepository";
import { BadRequestError, NotFoundError } from "../../utils/Errors";
import { notFound } from "../../utils/Functions";
import { IChatService } from "./IChatService";
import {
  INVALID_UUID,
  NO_CHATS_FOR_USER,
  Properties,
} from "../../utils/Constants";

export class ChatService implements IChatService {
  constructor(
    private chatRepository: ChatRepository,
    private userRepository: UserRepository
  ) {}

  async findById(id: string): Promise<Chat> {
    if (!validate(id)) {
      throw new BadRequestError(INVALID_UUID);
    }

    const chat = await this.chatRepository.findById(id);

    if (!chat) {
      throw new NotFoundError(notFound(Properties.CHAT));
    }

    return chat;
  }

  async findByOwner(owner: string): Promise<Chat[]> {
    const user = await this.userRepository.findByUsername(owner);

    if (!user) {
      throw new NotFoundError(notFound(Properties.OWNER));
    }

    const chats = await this.chatRepository.findByOwner(owner);

    if (chats.length === 0) {
      throw new NotFoundError(NO_CHATS_FOR_USER);
    }

    return chats;
  }

  async save(chatDTO: ChatDTO): Promise<void> {
    const sender = await this.userRepository.findByUsername(chatDTO.owner);

    if (!sender) {
      throw new NotFoundError(notFound(Properties.OWNER));
    }

    const chat = new Chat(chatDTO);

    await this.chatRepository.save(chat);
  }
}
