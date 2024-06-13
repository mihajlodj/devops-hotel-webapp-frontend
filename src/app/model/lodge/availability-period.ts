import { PriceType } from "./price-type";

export class LodgeAvailabilityPeriod {

    id: string = '';
    lodgeId: string = '';

    // @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSSS")
    dateFrom: string = '';

    // @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSSS")
    dateTo: string = '';

    priceType: PriceType = PriceType.PER_GUEST;
    price: number = 0;
}