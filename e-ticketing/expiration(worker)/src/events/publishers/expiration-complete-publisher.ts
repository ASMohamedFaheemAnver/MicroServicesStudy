import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@coders2authority/tik-common";

export class ExpirationCompltePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.EXPIRATION_COMPLETE = Subjects.EXPIRATION_COMPLETE;
}
