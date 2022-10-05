import { MessageDTO } from "../../dto/MessageDTO";
import { Message } from "../../models/Message/Message";

export interface IMessageRepository {
  findById(id: string): Promise<Message>;
  findByUser(username: string): Promise<Message[]>;
  findByGroup(id: string): Promise<Message[]>;
  save(message: MessageDTO): Promise<void>;
  update(message: Message): Promise<void>;
}
