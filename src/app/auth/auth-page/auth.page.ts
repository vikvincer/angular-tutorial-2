import { Component, Inject, type OnInit, OnDestroy, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import * as firebaseui from 'firebaseui';
import { Auth, EmailAuthProvider, GoogleAuthProvider, type User } from 'firebase/auth';
import { FIREBASE_AUTH_SERVICE } from "../tokens/firebase.auth.toke";
import { SessionStorageKeys } from "../constants/session-variables.enum";
import { setSession } from "src/app/utils/setSession.util";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true
})
export class AuthPage implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  isLoading: boolean = true;


  constructor(
    @Inject(FIREBASE_AUTH_SERVICE) private firebaseAuth: Auth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.ui = new firebaseui.auth.AuthUI(this.firebaseAuth);
    console.log('AuthPage constructed. Current idToken in sessionStorage:', sessionStorage.getItem('idToken'));
  }

  ngOnInit() {
    const uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: '',
      
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          const user = authResult.user;

          // Get the ID token
          user.getIdToken().then((idToken: string) => {
            console.log('Firebase ID Token:', idToken);

            if (idToken) {
              setSession(SessionStorageKeys.idToken, idToken);
            }

            this.ngZone.run(() => {
              this.router.navigate(['']);
            });

          }).catch((error: Error) => {
            console.error('Error getting ID token:', error);
          });

          // Return false to prevent FirebaseUI from automatically redirecting.
          // We are handling the redirect manually in the .then() block above.
          return false;
        },
        uiShown: () => {
          this.isLoading = false;
        }
      }
    };

    // The start method will wait until the DOM is loaded.
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  ngOnDestroy(): void {
    // It's important to clean up the FirebaseUI instance to avoid memory leaks.
    this.ui.delete();
  }
}
