import { Request, Response } from "express";
import { MessageDTO } from "../../dto/MessageDTO";
import { MessageService } from "../../services/Message/MessageService";
import { HttpStatusCode } from "../../utils/Constants";
import { APIError } from "../../utils/Errors";

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const response = await this.messageService.findById(id);
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

  async findByUser(req: Request, res: Response): Promise<any> {
    const { username } = req.params;

    try {
      const response = await this.messageService.findByUser(username);
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

  async findByGroup(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const response = await this.messageService.findByGroup(id);
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
    const { id, sender, receiver, content, timestamp, type } = req.body;

    try {
      await this.messageService.saveMessage(
        new MessageDTO(id, sender, receiver, content, timestamp, type)
      );
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

  async send(req: Request, res: Response): Promise<any> {
    const { id, sender, receiver, content, timestamp, type } = req.body;

    try {
      await this.messageService.sendMessage(
        new MessageDTO(id, sender, receiver, content, timestamp, type)
      );
      return res.status(HttpStatusCode.OK);
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

  async setReceived(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      await this.messageService.setReceived(id);
      return res.status(HttpStatusCode.OK).json();
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
