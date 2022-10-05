import { Request, Response } from "express";
import { GroupDTO } from "../../dto/GroupDTO";
import { GroupService } from "../../services/Group/GroupService";
import { HttpStatusCode } from "../../utils/Constants";
import { APIError } from "../../utils/Errors";

type Parameters = {
  username: string;
};

export class GroupController {
  constructor(private groupService: GroupService) {}

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const response = await this.groupService.findById(id);
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
    const query = req.params as unknown;
    const { username } = query as Parameters;

    try {
      const response = await this.groupService.findByUser(username);
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
    const { name, admin, image, participants } = req.body;

    try {
      await this.groupService.save(
        new GroupDTO(name, admin, image, participants)
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
}
