export class LodgeSearchRequest {
    dateFrom: string;
    dateTo: string;
    guestNumber: number | undefined;
    location: string;

    constructor(dateFrom: string, dateTo: string, guestNumber: number | undefined, location: string) {
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.guestNumber = guestNumber;
      this.location = location;
    }
}
