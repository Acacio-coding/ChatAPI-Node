import { Properties, INVALID_NAME_SPACE } from "../utils/Constants";
import { BadRequestError } from "../utils/Errors";
import {
  blankProperty,
  invalidPropertyLength,
  invalidPropertySpecial,
  invalidPropertyNumber,
  getParticipant,
} from "../utils/Functions";

export class GroupDTO {
  name: string;
  admin: string;
  image: string;
  participants: string[];

  constructor(
    name: string,
    admin: string,
    image: string,
    participants: string[]
  ) {
    validateProps(name, admin, participants);
    Object.assign(this, { name, admin, image, participants });
  }
}

const validateProps = (
  name: string,
  admin: string,
  participants: string[]
): void => {
  if (!name) {
    throw new BadRequestError(blankProperty(Properties.NAME));
  }

  if (!name.trim().length) {
    throw new BadRequestError(INVALID_NAME_SPACE);
  }

  if (!admin) {
    throw new BadRequestError(blankProperty(Properties.ADMIN));
  }

  if (admin.length < 4 || admin.length > 8) {
    throw new BadRequestError(invalidPropertyLength(Properties.ADMIN));
  }

  if (!/^[a-zA-Z0-9]+$/g.test(admin)) {
    throw new BadRequestError(invalidPropertySpecial(Properties.ADMIN));
  }

  if (/^[0-9]+$/g.test(admin)) {
    throw new BadRequestError(invalidPropertyNumber(Properties.ADMIN));
  }

  if (!participants) {
    throw new BadRequestError(blankProperty(Properties.PARTICIPANT));
  }

  participants.forEach((participant: string, index: number) => {
    if (!participant) {
      throw new BadRequestError(blankProperty(getParticipant(index)));
    }

    if (participant.length < 4 || participant.length > 8) {
      throw new BadRequestError(invalidPropertyLength(getParticipant(index)));
    }

    if (!/^[a-zA-Z0-9]+$/g.test(participant)) {
      throw new BadRequestError(invalidPropertySpecial(getParticipant(index)));
    }

    if (/^[0-9]+$/g.test(participant)) {
      throw new BadRequestError(invalidPropertyNumber(getParticipant(index)));
    }
  });
};
