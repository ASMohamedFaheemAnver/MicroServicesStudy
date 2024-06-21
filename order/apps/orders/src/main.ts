import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
