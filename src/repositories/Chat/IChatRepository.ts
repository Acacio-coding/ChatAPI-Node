import { Chat } from "../../models/Chat/Chat";

export interface IChatRepository {
  findById(id: string): Promise<Chat>;
  findByOwner(owner: string): Promise<Chat[]>;
  save(chat: Chat): Promise<void>;
}
