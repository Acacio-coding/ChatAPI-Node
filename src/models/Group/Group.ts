import { v4 as uuid } from "uuid";

export class Group {
  readonly id: string;
  name: string;
  admin: string;
  image: string;
  participants: string[];

  constructor(props: Omit<Group, "id">) {
    Object.assign(this, props);
    this.id = uuid();
  }
}
