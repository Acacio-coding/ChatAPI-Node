import { v4 as uuid } from "uuid";

export class Chat {
  readonly id: string;
  owner: string;
  receiver: string;
  avatar: string;

  constructor(props: Omit<Chat, "id">) {
    Object.assign(this, props);
    this.id = uuid();
  }
}
