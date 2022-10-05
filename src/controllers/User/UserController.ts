import { Request, Response } from "express";
import { UserDTO } from "../../dto/UserDTO";
import { UserService } from "../../services/User/UserService";
import { HttpStatusCode } from "../../utils/Constants";
import { APIError } from "../../utils/Errors";

export class UserController {
  constructor(private userService: UserService) {}

  async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body;

    try {
      const response = await this.userService.login(username, password);
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

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.userService.getAll();
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

  async findByUsername(req: Request, res: Response): Promise<any> {
    const { username } = req.params;

    try {
      const response = await this.userService.findByUsername(username);
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

  async update(req: Request, res: Response): Promise<any> {
    const { avatar, username, password } = req.body;

    try {
      await this.userService.update(new UserDTO(username, password, avatar));
      return res.status(HttpStatusCode.OK).send();
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
    const { username, avatar, password } = req.body;

    try {
      await this.userService.save(new UserDTO(username, password, avatar));
      return res.status(HttpStatusCode.CREATED).send();
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
