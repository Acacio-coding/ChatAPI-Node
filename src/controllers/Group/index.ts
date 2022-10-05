import { RabbitMQRepository } from "../../messaging/RabbitMQ";
import { GroupRepository } from "../../repositories/Group/GroupRepository";
import { UserRepository } from "../../repositories/User/UserRepository";
import { GroupService } from "../../services/Group/GroupService";
import { RABBITMQ_URL } from "../../utils/Constants";
import { GroupController } from "./GroupController";

const rabbitMQRepository = new RabbitMQRepository(RABBITMQ_URL);
const userRepository = new UserRepository();
const groupRepository = new GroupRepository();
const groupService = new GroupService(
  groupRepository,
  userRepository,
  rabbitMQRepository
);
const groupController = new GroupController(groupService);

export { groupController as GroupController };
