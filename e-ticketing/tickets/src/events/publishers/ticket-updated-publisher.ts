import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@coders2authority/tik-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TICKER_UPDATED = Subjects.TICKER_UPDATED;
}
