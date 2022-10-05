import { Files } from "../../utils/Constants";
import { read, write } from "../../utils/Functions";
import { Group } from "../../models/Group/Group";
import { IGroupRepository } from "./IGroupRepository";

export class GroupRepository implements IGroupRepository {
  async findById(id: string): Promise<Group> {
    const data = (await read(Files.GROUP_DB)) as Group[];
    return data.find((group) => group.id === id) as Group;
  }

  async findByUser(username: string): Promise<Group[]> {
    const data = (await read(Files.GROUP_DB)) as Group[];
    return data.filter(
      (group) =>
        group.admin === username ||
        group.participants.some((participant) => participant === username)
    );
  }

  async save(group: Group): Promise<void> {
    const data = (await read(Files.GROUP_DB)) as Group[];
    data.push(group);

    await write(Files.GROUP_DB, data);
  }
}
