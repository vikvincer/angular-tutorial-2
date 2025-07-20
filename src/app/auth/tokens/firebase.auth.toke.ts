import { InjectionToken } from "@angular/core";
import type { Auth } from "firebase/auth";

export const FIREBASE_AUTH_SERVICE = new InjectionToken<Auth>('FIREBASE_AUTH_SERVICE');
