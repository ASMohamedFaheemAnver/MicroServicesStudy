import { Subjects } from "./subjects";

export interface ExpirationCompleteEvent {
  subject: Subjects.EXPIRATION_COMPLETE;
  data: {
    orderId: string;
  };
}
