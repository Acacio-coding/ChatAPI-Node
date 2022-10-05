import { HttpStatusCode } from "./Constants";

export class APIError extends Error {
  title: string;
  status: HttpStatusCode;
  timestamp: Date;
  description: string;

  constructor(
    title: string,
    status: HttpStatusCode,
    description: string,
    timestamp: Date
  ) {
    super();
    this.description = description;
    this.title = title;
    this.status = status;
    this.timestamp = timestamp;
  }
}

export class NotFoundError extends APIError {
  constructor(description: string) {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, description, new Date());
  }
}

export class BadRequestError extends APIError {
  constructor(description: string) {
    super("BAD REQUEST", HttpStatusCode.BAD_REQUEST, description, new Date());
  }
}

export class ConflictError extends APIError {
  constructor(description: string) {
    super("CONFLICT", HttpStatusCode.BAD_REQUEST, description, new Date());
  }
}

export class UnauthorizedError extends APIError {
  constructor(description: string) {
    super("UNAUTHORIZED", HttpStatusCode.UNAUTHORIZED, description, new Date());
  }
}
