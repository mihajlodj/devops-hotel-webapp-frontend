import {CanActivateFn, Router} from '@angular/router';
import {CurrentUserService} from "../services/current-user.service";
import {inject} from "@angular/core";
import jwtDecode from "jwt-decode";
import {JwtPayload} from "../model/login/jwt-payload";

export const userGuard: CanActivateFn = (route, state) => {
  const currentUserService: CurrentUserService = inject(CurrentUserService);
  const router: Router = inject(Router);

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
  let loggedInUsername = decoded.sub;
  let requiredUsername = route.paramMap.get('username');

  if (loggedInUsername != requiredUsername) {
    router.navigate(['/page404']);
    return false;
  }

  return true;
};


const isJwt = (token: any): token is JwtPayload => {
  return typeof token === 'object' && Boolean(token.userId && token.sub && token.role);
}
