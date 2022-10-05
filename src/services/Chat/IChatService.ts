import { ChatDTO } from "../../dto/ChatDTO";
import { Chat } from "../../models/Chat/Chat";

export interface IChatService {
  findById(id: string): Promise<Chat>;
  findByOwner(owner: string): Promise<Chat[]>;
  save(chatDTO: ChatDTO): Promise<void>;
}
