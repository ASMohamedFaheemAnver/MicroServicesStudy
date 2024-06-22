import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { QueueEvents, RmqService } from '@app/common';
import { CreateOrderRequest } from 'apps/orders/src/dtos/create-order.request';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(QueueEvents.ORDER_CREATED)
  async handleOrderCreated(
    @Payload() data: CreateOrderRequest,
    @Ctx() context: RmqContext,
  ) {
    this.billingService.bill(data);
    // Ack to stop replaying
    this.rmqService.ack(context);
  }
}
