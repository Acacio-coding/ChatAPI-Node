import { User } from "../../models/User/User";

export interface IUserRepository {
  findByUsername(username: string): Promise<User>;
  getAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
}
