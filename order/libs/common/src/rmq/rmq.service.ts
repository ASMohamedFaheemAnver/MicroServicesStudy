import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { EnvKeys } from '../constants/strings';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>(EnvKeys.RABBIT_MQ_URI)],
        queue: this.configService.get<string>(
          EnvKeys.RABBIT_MQ_D_NAME_QUEUE(queue),
        ),
        noAck,
        persistent: true,
      },
    };
  }
  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
