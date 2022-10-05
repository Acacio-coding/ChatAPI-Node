import { validate } from "uuid";
import { BadRequestError } from "../utils/Errors";
import { INVALID_TYPE, INVALID_UUID, Properties } from "../utils/Constants";
import {
  blankProperty,
  invalidPropertyLength,
  invalidPropertyNumber,
  invalidPropertySpecial,
} from "../utils/Functions";

export class MessageDTO {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  type: string;

  constructor(
    id: string,
    sender: string,
    receiver: string,
    content: string,
    timestamp: string,
    type: string
  ) {
    validateProps(id, sender, receiver, content, timestamp, type);
    Object.assign(this, { id, sender, receiver, content, timestamp, type });
  }
}

const validateProps = (
  id: string,
  sender: string,
  receiver: string,
  content: string,
  timestamp: string,
  type: string
): void => {
  if (!id) {
    throw new BadRequestError(blankProperty(Properties.ID));
  }

  if (!validate(id)) {
    throw new BadRequestError(INVALID_UUID);
  }

  if (!sender) {
    throw new BadRequestError(blankProperty(Properties.SENDER));
  }

  if (sender.length < 4 || sender.length > 8) {
    throw new BadRequestError(invalidPropertyLength(Properties.SENDER));
  }

  if (!/^[a-zA-Z0-9]+$/g.test(sender)) {
    throw new BadRequestError(invalidPropertySpecial(Properties.SENDER));
  }

  if (/^[0-9]+$/g.test(sender)) {
    throw new BadRequestError(invalidPropertyNumber(Properties.SENDER));
  }

  if (!receiver) {
    throw new BadRequestError(blankProperty(Properties.RECEIVER));
  }

  if (!content) {
    throw new BadRequestError(blankProperty(Properties.CONTENT));
  }

  if (!timestamp) {
    throw new BadRequestError(blankProperty(Properties.TIMESTAMP));
  }

  if (!type) {
    throw new BadRequestError(blankProperty(Properties.TYPE));
  }

  if (type !== "user" && type !== "group") {
    throw new BadRequestError(INVALID_TYPE);
  }
};
