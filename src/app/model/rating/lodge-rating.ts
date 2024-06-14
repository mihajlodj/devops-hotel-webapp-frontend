import { User } from "../user/user";
import { UserRole } from "../user/user-role";

export class LodgeRating {
    id: string = '';
    lodgeId: string = '';
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