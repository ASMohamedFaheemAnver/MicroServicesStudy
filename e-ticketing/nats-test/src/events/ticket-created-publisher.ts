import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TICKER_CREATED = Subjects.TICKER_CREATED;
}
