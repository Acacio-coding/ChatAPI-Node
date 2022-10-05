import { Chat } from "../../models/Chat/Chat";
import { Files } from "../../utils/Constants";
import { read, write } from "../../utils/Functions";
import { IChatRepository } from "./IChatRepository";

export class ChatRepository implements IChatRepository {
  async findById(id: string): Promise<Chat> {
    const data = (await read(Files.CHAT_DB)) as Chat[];
    return data.find((chat) => chat.id === id) as Chat;
  }

  async findByOwner(owner: string): Promise<Chat[]> {
    const data = (await read(Files.CHAT_DB)) as Chat[];
    return data.filter((chat) => chat.owner === owner);
  }

  async save(chat: Chat): Promise<void> {
    const data = (await read(Files.CHAT_DB)) as Chat[];
    data.push(chat);

    await write(Files.CHAT_DB, data);
  }
}
