import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TICKER_UPDATED;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
