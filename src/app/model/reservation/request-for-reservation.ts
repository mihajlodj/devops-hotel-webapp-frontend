import { throwError } from "rxjs";
import { Lodge } from "../lodge/lodge";
import { User } from "../user/user";

export class RequestForReservation {
    id: string = '';
    lodgeId: string = '';
    guestId: string = '';
    ownerId: string = '';
    price: number = 0;

    lodge: Lodge = new Lodge();
    guest: User | null = null;
    owner: User | null = null;

    guestCancelCount: number = 0;
    hostAvgRating: number = 0;

}