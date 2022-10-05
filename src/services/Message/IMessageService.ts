import { MessageDTO } from "../../dto/MessageDTO";
import { Message } from "../../models/Message/Message";

export interface IMessageService {
  findById(id: string): Promise<Message>;
  findByUser(username: string): Promise<Message[]>;
  findByGroup(id: string): Promise<Message[]>;
  saveMessage(messageDTO: MessageDTO): Promise<void>;
  setReceived(id: string): Promise<void>;
}
