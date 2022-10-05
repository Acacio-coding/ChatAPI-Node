import { RabbitMQRepository } from "../../messaging/RabbitMQ";
import { ChatRepository } from "../../repositories/Chat/ChatRepository";
import { UserRepository } from "../../repositories/User/UserRepository";
import { ChatService } from "../../services/Chat/ChatService";
import { ChatController } from "./ChatController";

const chatRepository = new ChatRepository();
const userRepository = new UserRepository();
const chatService = new ChatService(chatRepository, userRepository);
const chatController = new ChatController(chatService);

export { chatController as ChatController };
