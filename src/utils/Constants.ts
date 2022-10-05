import dotenv from "dotenv";

dotenv.config();

/* API */
export const PORT = parseInt(process.env.PORT || "8080");
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

/* Generic Error Descriptions */
export const INVALID_UUID = "ID is an invalid UUID";

/* Message Error Descriptions */
export const INVALID_TYPE = "Message type is invalid";
export const INVALID_PASSWORD_SPACE = "Password cannot contain spaces";
export const INVALID_PASSWORD_UPERCASE_LETTER =
  "Password must contain at least one uppercase letter";
export const INVALID_PASSWORD_LOWERCASE_LETTER =
  "Password must contain at least one lowercase letter";
export const INVALID_PASSWORD_NUMBER =
  "Password must contain at least one digit";
export const INVALID_PASSWORD_SYMBOL =
  "Password must contain at least one special character";
export const PASSWORD_NOT_MATCH = "Invalid password for user";
export const NO_MESSAGES_FOR_USER =
  "The user did not send or receive any message";
export const NO_MESSAGES_FOR_GROUP =
  "There isn't any message sent for this group";
export const NO_GROUPS_FOR_USER =
  "The user didn't create or participate in any group";
export const NO_CHATS_FOR_USER = "There isn't any chat for this user";
export const INVALID_DATE = "Date is invalid, it cannot be bigger than now";

/* Group Validation */
export const INVALID_NAME_SPACE = "Name cannot contain only white spaces";

/* Properties */
export enum Properties {
  ID = "Id",
  USER = "User",
  USERNAME = "Username",
  PASSWORD = "Password",
  PAGE = "Page",
  LIMIT = "Limit",
  SENDER = "Sender",
  RECEIVER = "Receiver",
  ADMIN = "Admin",
  GROUP = "Group",
  NAME = "Name",
  PARTICIPANT = "Participant",
  CONTENT = "Content",
  MESSAGE = "Message",
  OWNER = "Owner",
  CHAT = "Chat",
  TIMESTAMP = "Timestamp",
  TYPE = "Type",
}

/* Routes */
export enum Routes {
  BASE_API = "/api/v1",
  LOGIN = "/login",
  USER = "/users/:username?",
  ALL_USERS = "/users/get/all",
  GROUP = "/groups/:id?",
  USER_GROUPS = "/groups/user/:username",
  MESSAGE = "/messages/:id?",
  ONLY_SEND = "/messages/new/chat",
  USER_MESSAGES = "/messages/user/:username",
  GROUP_MESSAGES = "/messages/group/:id",
  CHAT = "/chat/:id",
  CHATS = "/chats/:owner?",
}

/* Messaging */
export const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

export enum Amqp {
  QUEUE = "users.v1.",
  ROUTING_KEY = "groups.v1.",
  DIRECT = "amq.direct",
  TOPIC = "amq.topic",
}

export enum WebSocket {
  CONNECT = "connection",
  DISCONNECT = "disconnect",
}

/* File paths */
export enum Files {
  USER_DB = "./src/database/user-database.json",
  GROUP_DB = "./src/database/group-database.json",
  MESSAGE_DB = "./src/database/message-database.json",
  CHAT_DB = "./src/database/chat-database.json",
}

/* Status Codes */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
}
