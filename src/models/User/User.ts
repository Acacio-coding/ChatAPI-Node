import { v4 as uuid } from "uuid";
import { hash } from "../../utils/Functions";

export class User {
  readonly id: string;
  username: string;
  password: string;
  avatar: string;

  constructor(props: Omit<User, "id">) {
    Object.assign(this, props);
    this.id = uuid();
  }
}
