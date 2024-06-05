import { Photo } from "../photo/photo";
import { RequestForReservationApprovalType } from "./request-for-approval";

export class Lodge {
    id: number = 0;
    name: string = '';
    location: string = '';
    amenities: string[] = [];
    minimalGuestNumber: number = 1;
    maximalGuestNumber: number = 1;
    photos: Photo[] = [];
    approvalType: RequestForReservationApprovalType = RequestForReservationApprovalType.AUTOMATIC;
}