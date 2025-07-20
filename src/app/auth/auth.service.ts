import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageKeys } from './constants/session-variables.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticated.asObservable();

  private hasToken(): boolean {
    return !!sessionStorage.getItem(SessionStorageKeys.idToken);
  }

  login(): void {
    this.isAuthenticated.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    sessionStorage.removeItem(SessionStorageKeys.idToken);
    this.isAuthenticated.next(false);
    this.router.navigate(['/auth']);
  }
}