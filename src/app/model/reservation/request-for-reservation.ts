import { ReservationRequestStatus } from "./reservation-request-status";

export class RequestForReservation {
    id: string = '';
    lodgeId: string = '';
    guestId: string = '';
    ownerId: string = '';
    price: number = 0;

    dateFrom: string = '';
    dateTo: string = '';

    numberOfGuests: number = 0;
    status = ReservationRequestStatus.WAITING_FOR_RESPONSE;
}
