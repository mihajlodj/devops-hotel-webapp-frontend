import { RequestForReservationApprovalType } from "./request-for-approval";

export class Lodge {
    id: number = 0;
    name: string = '';
    location: string = '';
    amenities: string[] = [];
    minimalGuestNumber: number = 1;
    maximalGuestNumber: number = 1;
    approvalType: RequestForReservationApprovalType = RequestForReservationApprovalType.AUTOMATIC;
}