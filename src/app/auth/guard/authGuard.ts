import { AuthService } from './../services/auth/auth.service';
import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { tap } from 'rxjs';
import { SessionStorageKeys } from '../constants/session-variables.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const idToken = sessionStorage.getItem(SessionStorageKeys.idToken);

  if (idToken) {
    return true; 
  }

  return router.parseUrl('/auth');
};