import { APP_INITIALIZER, NgModule, type ModuleWithProviders } from "@angular/core";
import { getAuth } from 'firebase/auth';
import type { FirebaseApp } from "firebase/app";
import { FIREBASE_AUTH_SERVICE } from "./tokens/firebase.auth.toke";
import { AuthService } from "./services/auth/auth.service";

@NgModule({})

export class AuthModule {
  static forRoot(app: FirebaseApp ):  ModuleWithProviders<AuthModule> {
    app.name
    return {
      ngModule: AuthModule,
      providers: [
        { provide: FIREBASE_AUTH_SERVICE, useValue: getAuth(app) },
        AuthService,
      ]
    };
  }
}
