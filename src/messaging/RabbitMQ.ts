import { Connection, Channel, connect } from "amqplib";
import { Amqp } from "../utils/Constants";

export class RabbitMQRepository {
  private connection: Connection;
  private channel: Channel;

  constructor(private uri: string) {
    this.uri = uri;
  }

  async connect() {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  async createQueue(queue: string): Promise<void> {
    await this.channel.assertQueue(`${Amqp.QUEUE}${queue}`);
    await this.channel.bindQueue(
      `${Amqp.QUEUE}${queue}`,
      Amqp.DIRECT,
      `${Amqp.QUEUE}${queue}`
    );
  }

  async bindQueue(queue: string, group: string): Promise<void> {
    await this.channel.bindQueue(
      `${Amqp.QUEUE}${queue}`,
      Amqp.TOPIC,
      `${Amqp.ROUTING_KEY}${group}`
    );
  }

  async deleteQueue(queue: string): Promise<void> {
    await this.channel.deleteQueue(queue);
  }

  async publishToQueue(queue: string, message: string): Promise<void> {
    this.channel.publish(
      Amqp.DIRECT,
      `${Amqp.QUEUE}${queue}`,
      Buffer.from(message)
    );
  }

  async publishToExchange(routingKey: string, message: string): Promise<void> {
    this.channel.publish(
      Amqp.TOPIC,
      `${Amqp.ROUTING_KEY}${routingKey}`,
      Buffer.from(message)
    );
  }
}
