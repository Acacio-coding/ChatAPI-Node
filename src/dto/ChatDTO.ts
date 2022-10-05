import { Properties } from "../utils/Constants";
import { BadRequestError } from "../utils/Errors";
import {
  blankProperty,
  invalidPropertyLength,
  invalidPropertySpecial,
  invalidPropertyNumber,
} from "../utils/Functions";

export class ChatDTO {
  owner: string;
  receiver: string;
  avatar: string;

  constructor(owner: string, receiver: string, avatar: string) {
    validateProps(owner, receiver);
    this.owner = owner;
    this.receiver = receiver;
    this.avatar = avatar;
  }
}

const validateProps = (owner: string, receiver: string): void => {
  if (!owner) {
    throw new BadRequestError(blankProperty(Properties.OWNER));
  }

  if (!receiver) {
    throw new BadRequestError(blankProperty(Properties.RECEIVER));
  }

  if (owner.length < 4 || owner.length > 8) {
    throw new BadRequestError(invalidPropertyLength(Properties.OWNER));
  }

  if (receiver.length < 4 || receiver.length > 8) {
    throw new BadRequestError(invalidPropertyLength(Properties.RECEIVER));
  }

  if (!/^[a-zA-Z0-9]+$/g.test(owner)) {
    throw new BadRequestError(invalidPropertySpecial(Properties.OWNER));
  }

  if (!/^[a-zA-Z0-9]+$/g.test(receiver)) {
    throw new BadRequestError(invalidPropertySpecial(Properties.RECEIVER));
  }

  if (/^[0-9]+$/g.test(owner)) {
    throw new BadRequestError(invalidPropertyNumber(Properties.OWNER));
  }

  if (/^[0-9]+$/g.test(receiver)) {
    throw new BadRequestError(invalidPropertyNumber(Properties.RECEIVER));
  }
};
