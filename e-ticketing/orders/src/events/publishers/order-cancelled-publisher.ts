import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@coders2authority/tik-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;
}
