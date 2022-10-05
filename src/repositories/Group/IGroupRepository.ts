import { Group } from "../../models/Group/Group";

export interface IGroupRepository {
  findById(id: string): Promise<Group>;
  findByUser(username: string): Promise<Group[]>;
  save(group: Group): Promise<void>;
}
