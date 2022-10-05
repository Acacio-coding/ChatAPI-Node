import { Request, Response } from "express";
import { ChatDTO } from "../../dto/ChatDTO";
import { ChatService } from "../../services/Chat/ChatService";
import { HttpStatusCode } from "../../utils/Constants";
import { APIError } from "../../utils/Errors";

export class ChatController {
  constructor(private chatService: ChatService) {}

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const response = await this.chatService.findById(id);
      return res.status(HttpStatusCode.OK).json(response);
    } catch (err) {
      const error = err as APIError;
      const { status, title, description, timestamp } = error;

      return res.status(status).json({
        status: status,
        title: title,
        description: description,
        timestamp: timestamp,
      });
    }
  }

  async findByOwner(req: Request, res: Response): Promise<any> {
    const { owner } = req.params;

    try {
      const response = await this.chatService.findByOwner(owner);
      return res.status(HttpStatusCode.OK).json(response);
    } catch (err) {
      const error = err as APIError;
      const { status, title, description, timestamp } = error;

      return res.status(status).json({
        status: status,
        title: title,
        description: description,
        timestamp: timestamp,
      });
    }
  }

  async save(req: Request, res: Response): Promise<any> {
    const { owner, receiver, avatar } = req.body;

    try {
      await this.chatService.save(new ChatDTO(owner, receiver, avatar));
      return res.status(HttpStatusCode.CREATED);
    } catch (err) {
      const error = err as APIError;
      const { status, title, description, timestamp } = error;

      return res.status(status).json({
        status: status,
        title: title,
        description: description,
        timestamp: timestamp,
      });
    }
  }
}
