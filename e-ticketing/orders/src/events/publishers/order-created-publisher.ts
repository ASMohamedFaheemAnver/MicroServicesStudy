import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@coders2authority/tik-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
}
