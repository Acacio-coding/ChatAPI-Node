import { User } from "../../models/User/User";
import { IUserRepository } from "./IUserRepository";
import { read, write } from "../../utils/Functions";
import { Files } from "../../utils/Constants";

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User> {
    const data = (await read(Files.USER_DB)) as User[];
    return data.find((user) => user.username === username) as User;
  }

  async getAll(): Promise<User[]> {
    const data = (await read(Files.USER_DB)) as User[];
    return data;
  }

  async update(user: User): Promise<void> {
    let data = (await read(Files.USER_DB)) as User[];
    data = data.map((toUpdate) =>
      toUpdate.username === user.username
        ? { ...toUpdate, avatar: user.avatar }
        : toUpdate
    );
    await write(Files.USER_DB, data);
  }

  async save(user: User): Promise<void> {
    const data = await read(Files.USER_DB);
    data.push(user);

    await write(Files.USER_DB, data);
  }
}
