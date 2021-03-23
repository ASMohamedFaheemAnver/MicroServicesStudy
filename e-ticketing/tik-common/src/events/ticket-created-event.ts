import { Subjects } from "./subjects";

export interface TicketCreatedEvent {
  subject: Subjects.TICKER_CREATED;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
