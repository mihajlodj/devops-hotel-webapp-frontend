export class LodgeSearchRequest {
    dateFrom: string | null;
    dateTo: string | null;
    guestNumber: number | undefined;
    location: string | null;

    constructor(dateFrom: string | null, dateTo: string | null, guestNumber: number | undefined, location: string | null) {
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.guestNumber = guestNumber;
      this.location = location;
    }
}
