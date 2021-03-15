import { Subjects } from "./subjects";

export interface TicketCreatedEvent {
  subject: Subjects.TICKER_CREATED;
  data: { id: string; title: string; price: number };
}
