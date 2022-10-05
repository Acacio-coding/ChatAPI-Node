import { GroupDTO } from "../../dto/GroupDTO";
import { Group } from "../../models/Group/Group";

export interface IGroupService {
  findById(id: string): Promise<Group>;
  findByUser(username: string): Promise<Group[]>;
  save(groupDTO: GroupDTO): Promise<void>;
}
