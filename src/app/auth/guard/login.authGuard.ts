import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { SessionStorageKeys } from '../constants/session-variables.enum';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const idToken = sessionStorage.getItem(SessionStorageKeys.idToken);

  if (!idToken) {
    return true; 
  }

  return router.parseUrl('/');
};