import { UserDTO } from "../../dto/UserDTO";
import { User } from "../../models/User/User";

export interface IUserService {
  login(username: string, pass: string): Promise<Object>;
  getAll(): Promise<Object[]>;
  findByUsername(username: string): Promise<Object>;
  update(userdto: UserDTO): Promise<void>;
  save(userdto: UserDTO): Promise<void>;
}
