import { PASSWORD_NOT_MATCH, Properties } from "../../utils/Constants";
import { UserDTO } from "../../dto/UserDTO";
import { RabbitMQRepository } from "../../messaging/RabbitMQ";
import { User } from "../../models/User/User";
import { IUserRepository } from "../../repositories/User/IUserRepository";
import { IUserService } from "./IUserService";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/Errors";
import {
  alreadyExists,
  blankProperty,
  compare,
  hash,
  negativeNumber,
  noRecords,
  notFound,
} from "../../utils/Functions";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private rabbitMQRepository: RabbitMQRepository
  ) {
    rabbitMQRepository.connect();
  }

  async login(username: string, pass: string): Promise<Object> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundError(notFound(Properties.USER));
    }

    const valid = await compare(pass, user.password);

    if (!valid) {
      throw new UnauthorizedError(PASSWORD_NOT_MATCH);
    }

    const { password, ...toReturn } = user;
    await this.rabbitMQRepository.createQueue(user.username);

    return toReturn;
  }

  async getAll(): Promise<Object[]> {
    let users = await this.userRepository.getAll();

    if (users.length === 0) {
      throw new NotFoundError(noRecords(Properties.USER));
    }

    users = users.map(({ password, ...rest }) => rest) as [];

    return users;
  }

  async findByUsername(username: string): Promise<Object> {
    let user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundError(notFound(Properties.USER));
    }

    const { password, ...toReturn } = user;

    return toReturn;
  }

  async update(userdto: UserDTO): Promise<void> {
    let user = await this.userRepository.findByUsername(userdto.username);

    if (!user) {
      throw new NotFoundError(notFound(Properties.USER));
    }

    const valid = await compare(userdto.password, user.password);

    if (!valid) {
      throw new UnauthorizedError(PASSWORD_NOT_MATCH);
    }

    user = { ...user, avatar: userdto.avatar };

    await this.userRepository.update(user);
  }

  async save(userdto: UserDTO): Promise<void> {
    const exists = await this.userRepository.findByUsername(userdto.username);

    if (exists) {
      throw new ConflictError(alreadyExists(Properties.USER));
    }

    const hashedPassword = await hash(userdto.password);

    const user = new User({ ...userdto, password: hashedPassword });

    await this.userRepository.save(user);

    await this.rabbitMQRepository.createQueue(user.username);
  }
}
