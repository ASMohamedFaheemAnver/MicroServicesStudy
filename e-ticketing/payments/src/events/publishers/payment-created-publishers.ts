import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@coders2authority/tik-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
}
