import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@coders2authority/tik-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TICKER_CREATED = Subjects.TICKER_CREATED;
}
