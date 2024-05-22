import {CanActivateFn, Router} from '@angular/router';
import {CurrentUserService} from "../services/current-user.service";
import {inject} from "@angular/core";
import jwtDecode from "jwt-decode";
import {JwtPayload} from "../model/login/jwt-payload";

export const loginRoleGuard: CanActivateFn = (route, state) => {
  const currentUserService: CurrentUserService = inject(CurrentUserService);
  const router: Router = inject(Router);

  const requiredRole = route.data['role'] as string;

  let token = currentUserService.getToken();
  if (!token) {
    console.log("NEMA TOKENA")
    router.navigate(['/login']);
    return false;
  }

  let decoded = jwtDecode(token);
  if (!isJwt(decoded)) {
    console.log("HUAAA")
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && decoded.role != requiredRole) {
    return false;
  }

  return true;
};


const isJwt = (token: any): token is JwtPayload => {
  return typeof token === 'object' && Boolean(token.userId && token.sub && token.role);
}
