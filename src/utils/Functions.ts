import fs from "fs/promises";
import bcrypt from "bcrypt";
import path from "path";
import { SALT_ROUNDS } from "./Constants";

export const getParticipant = (index: number): string => {
  return `Participant #${index}`;
};

export const blankProperty = (property: string): string => {
  return `${property} cannot be blank`;
};

export const invalidPropertyLength = (property: string): string => {
  return `${property} must be between 4 and 8 characters`;
};

export const invalidPropertySpecial = (property: string): string => {
  return `${property} cannot have special characters or white spaces`;
};

export const invalidPropertyNumber = (property: string): string => {
  return `${property} cannot contain only numbers`;
};

export const noRecords = (property: string): string => {
  return `There isn't any ${property} registered`;
};

export const alreadyExists = (property: string): string => {
  return `${property} already exists`;
};

export const notFound = (property: string): string => {
  return `${property} was not found`;
};

export const negativeNumber = (property: string): string => {
  return `${property} must be bigger than 0`;
};

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const read = async (filePath: string): Promise<Object[]> => {
  return JSON.parse(await fs.readFile(path.resolve(filePath), "utf-8"));
};

export const write = async (
  filePath: string,
  data: Object[]
): Promise<void> => {
  await fs.writeFile(path.resolve(filePath), JSON.stringify(data), "utf-8");
};
