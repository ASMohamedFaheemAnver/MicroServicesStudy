import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { QueueNames, RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(QueueNames.BILLING));
  await app.startAllMicroservices();
}
bootstrap();
