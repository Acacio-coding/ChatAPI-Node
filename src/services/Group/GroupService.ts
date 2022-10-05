import { validate } from "uuid";
import { Group } from "../../models/Group/Group";
import { IGroupService } from "./IGroupService";
import { GroupRepository } from "../../repositories/Group/GroupRepository";
import { BadRequestError, NotFoundError } from "../../utils/Errors";
import { notFound } from "../../utils/Functions";
import { UserRepository } from "../../repositories/User/UserRepository";
import { GroupDTO } from "../../dto/GroupDTO";
import {
  INVALID_UUID,
  NO_GROUPS_FOR_USER,
  Properties,
} from "../../utils/Constants";
import { RabbitMQRepository } from "../../messaging/RabbitMQ";

export class GroupService implements IGroupService {
  constructor(
    private groupRepository: GroupRepository,
    private userRepository: UserRepository,
    private rabbitMQRepository: RabbitMQRepository
  ) {
    this.rabbitMQRepository.connect();
  }

  async findById(id: string): Promise<Group> {
    if (!validate(id)) {
      throw new BadRequestError(INVALID_UUID);
    }

    const group = await this.groupRepository.findById(id);

    if (!group) {
      throw new NotFoundError(notFound(Properties.GROUP));
    }

    return group;
  }

  async findByUser(username: string): Promise<Group[]> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundError(notFound(Properties.USER));
    }

    const groups = await this.groupRepository.findByUser(user.username);

    if (groups.length === 0) {
      throw new NotFoundError(NO_GROUPS_FOR_USER);
    }

    return groups;
  }

  async save(groupDTO: GroupDTO): Promise<void> {
    const group = new Group(groupDTO);
    await this.groupRepository.save(group);

    await this.rabbitMQRepository.bindQueue(group.admin, group.id);

    group.participants.forEach(async (participant) => {
      await this.rabbitMQRepository.bindQueue(participant, group.id);
    });
  }
}
