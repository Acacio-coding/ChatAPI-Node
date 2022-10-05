import { Message } from "../../models/Message/Message";
import { IMessageRepository } from "./IMessageRepository";
import { Files } from "../../utils/Constants";
import { read, write } from "../../utils/Functions";
import { Group } from "../../models/Group/Group";

export class MessageRepository implements IMessageRepository {
  async findById(id: string): Promise<Message> {
    const data = (await read(Files.MESSAGE_DB)) as Message[];
    return data.find((message) => message.id === id) as Message;
  }

  async findByUser(username: string): Promise<Message[]> {
    const data = (await read(Files.MESSAGE_DB)) as Message[];
    const groups = (await read(Files.GROUP_DB)) as Group[];

    const userGroups = groups.filter(
      (group) =>
        group.admin === username ||
        group.participants.some((p) => {
          return p === username;
        })
    );

    return data.filter((message) => {
      return (
        message.received &&
        (message.sender === username ||
          message.receiver === username ||
          userGroups.some((group) => {
            return message.receiver === group.id;
          }))
      );
    });
  }

  async findByGroup(id: string): Promise<Message[]> {
    const data = (await read(Files.MESSAGE_DB)) as Message[];
    return data.filter(
      (message) => message.receiver === id && message.received
    );
  }

  async save(message: Message): Promise<void> {
    const data = await read(Files.MESSAGE_DB);
    data.push(message);

    await write(Files.MESSAGE_DB, data);
  }

  async update(message: Message): Promise<void> {
    let data = (await read(Files.MESSAGE_DB)) as Message[];

    data.forEach((toUpdate) => {
      if (toUpdate.id === message.id) toUpdate.received = true;
    });

    await write(Files.MESSAGE_DB, data);
  }
}
