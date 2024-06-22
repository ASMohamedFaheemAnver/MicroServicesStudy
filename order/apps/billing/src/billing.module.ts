import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvKeys, QueueNames, RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        [EnvKeys.RABBIT_MQ_URI]: Joi.string().required(),
        [EnvKeys.RABBIT_MQ_D_NAME_QUEUE(QueueNames.BILLING)]:
          Joi.string().required(),
      }),
    }),
    RmqModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
