export class Message {
  readonly id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  type: string;
  received: boolean;

  constructor(
    id: string,
    sender: string,
    receiver: string,
    content: string,
    timestamp: string,
    received: boolean,
    type: string
  ) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.timestamp = timestamp;
    this.received = received;
    this.type = type;
  }
}
