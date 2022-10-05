import { BadRequestError } from "../utils/Errors";
import {
  INVALID_PASSWORD_LOWERCASE_LETTER,
  INVALID_PASSWORD_NUMBER,
  INVALID_PASSWORD_SPACE,
  INVALID_PASSWORD_SYMBOL,
  INVALID_PASSWORD_UPERCASE_LETTER,
  Properties,
} from "../utils/Constants";
import {
  blankProperty,
  invalidPropertyLength,
  invalidPropertyNumber,
  invalidPropertySpecial,
} from "../utils/Functions";

export class UserDTO {
  username: string;
  password: string;
  avatar: string;

  constructor(username: string, password: string, avatar: string) {
    validateProps(username, password);
    this.username = username;
    this.password = password;
    this.avatar = avatar;
  }
}

const validateProps = (username: string, password: string): void => {
  if (!username) {
    throw new BadRequestError(blankProperty(Properties.USERNAME));
  }

  if (username.length < 4 || username.length > 8) {
    throw new BadRequestError(invalidPropertyLength(Properties.USERNAME));
  }

  if (!/^[a-zA-Z0-9]+$/g.test(username)) {
    throw new BadRequestError(invalidPropertySpecial(Properties.USERNAME));
  }

  if (/^[0-9]+$/g.test(username)) {
    throw new BadRequestError(invalidPropertyNumber(Properties.USERNAME));
  }

  if (!password) {
    throw new BadRequestError(blankProperty(Properties.PASSWORD));
  }

  if (password.length < 4 || password.length > 8) {
    throw new BadRequestError(invalidPropertyLength(Properties.PASSWORD));
  }

  if (/\s+/g.test(password)) {
    throw new BadRequestError(INVALID_PASSWORD_SPACE);
  }

  if (!/[A-Z]+/g.test(password)) {
    throw new BadRequestError(INVALID_PASSWORD_UPERCASE_LETTER);
  }

  if (!/[a-z]+/g.test(password)) {
    throw new BadRequestError(INVALID_PASSWORD_LOWERCASE_LETTER);
  }

  if (!/[0-9]+/g.test(password)) {
    throw new BadRequestError(INVALID_PASSWORD_NUMBER);
  }

  if (!/[@%+\\/'!#$^?:;,(){}[\]~\`\-_.]+/g.test(password)) {
    throw new BadRequestError(INVALID_PASSWORD_SYMBOL);
  }
};
