import { ReservationStatus } from "./reservation-status";

export class Reservation {
    id: string = '';
    lodgeId: string = '';
    guestId: string = '';
    ownerId: string = '';
    price: number = 0;
    dateFrom: string = '';
    dateTo: string = '';
    numberOfGuests: number = 0;
    status: ReservationStatus = ReservationStatus.ACTIVE;
}
