import { User } from "../user/user";
import { UserRole } from "../user/user-role";

export class HostRating {
    id: string = '';
    hostId: string = '';
    rating: number = 0;
    comment: string = '';
    datetime: string = '';
    createdBy: User = {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.GUEST,
        notificationsAllowed: true
    };
}