import { inject, Injectable } from "@angular/core";
import { getAuth, Auth } from 'firebase/auth'; // Import Auth type
import { FIREBASE_AUTH_SERVICE } from "../../tokens/firebase.auth.toke";
import { Router } from "@angular/router";
import { SessionStorageKeys } from "../../constants/session-variables.enum";
import { getSession } from "src/app/utils/getSession.util";
import { clearSession } from "src/app/utils/clearSession.util";
import { BehaviorSubject, type Observable } from "rxjs";

Injectable()

export class AuthService {
  private fbAuthService = inject<Auth>(FIREBASE_AUTH_SERVICE);
  private _isLoggedIn = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor() {
    this.fbAuthService.beforeAuthStateChanged((user) => {
      if (user) {
        this.setAuthStatus(true);
      }
    })
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isLoggedIn$
  }

  setAuthStatus(status: boolean): void {
    this._isLoggedIn.next(status);
  }

  async logout() {
    clearSession(SessionStorageKeys.idToken);
    return await this.fbAuthService.signOut().then(() => {
      this._isLoggedIn.next(false);
      this.clearSessionStorage();
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  }

  protected clearSessionStorage(): void {
    clearSession(SessionStorageKeys.idToken);
  }

  protected checkInitialLoginStatus(): boolean {
    return !!getSession(SessionStorageKeys.idToken);
  }

}
