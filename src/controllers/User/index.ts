import { RabbitMQRepository } from "../../messaging/RabbitMQ";
import { UserRepository } from "../../repositories/User/UserRepository";
import { UserService } from "../../services/User/UserService";
import { RABBITMQ_URL } from "../../utils/Constants";
import { UserController } from "./UserController";

const rabbitMQRepository = new RabbitMQRepository(RABBITMQ_URL);
const userRepository = new UserRepository();
const userService = new UserService(userRepository, rabbitMQRepository);
const userController = new UserController(userService);

export { userController as UserController };
