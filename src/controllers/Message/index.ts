import { RabbitMQRepository } from "../../messaging/RabbitMQ";
import { GroupRepository } from "../../repositories/Group/GroupRepository";
import { MessageRepository } from "../../repositories/Message/MessageRepository";
import { UserRepository } from "../../repositories/User/UserRepository";
import { MessageService } from "../../services/Message/MessageService";
import { RABBITMQ_URL } from "../../utils/Constants";
import { MessageController } from "./MessageController";

const userRepository = new UserRepository();
const groupRepository = new GroupRepository();
const messageRepository = new MessageRepository();
const rabbitMqRepository = new RabbitMQRepository(RABBITMQ_URL);
const messageService = new MessageService(
  messageRepository,
  userRepository,
  groupRepository,
  rabbitMqRepository
);
const messageController = new MessageController(messageService);

export { messageController as MessageController };
