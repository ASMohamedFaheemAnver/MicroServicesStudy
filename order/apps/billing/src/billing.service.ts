import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest } from 'apps/orders/src/dtos/create-order.request';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  bill(data: CreateOrderRequest) {
    this.logger.log('Billing...', data);
  }
}
