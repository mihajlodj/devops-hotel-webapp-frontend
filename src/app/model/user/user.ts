import {UserRole} from "./user-role";

export interface User {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole,
  notificationsAllowed: boolean
}
