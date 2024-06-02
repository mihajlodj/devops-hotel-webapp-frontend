import {CanActivateFn, Router} from '@angular/router';
import {CurrentUserService} from "../services/current-user.service";
import {inject} from "@angular/core";
import jwtDecode from "jwt-decode";
import {JwtPayload} from "../model/login/jwt-payload";

export const loginRoleGuard: CanActivateFn = (route, state) => {
  const currentUserService: CurrentUserService = inject(CurrentUserService);
  const router: Router = inject(Router);

  const requiredRoles = route.data['roles'] as string;

  let token = currentUserService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  let decoded = jwtDecode(token);
  if (!isJwt(decoded)) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles && !requiredRoles.includes(decoded.role)) {
    router.navigate(['/page404']);
    return false;
  }

  return true;
};


const isJwt = (token: any): token is JwtPayload => {
  return typeof token === 'object' && Boolean(token.userId && token.sub && token.role);
}
