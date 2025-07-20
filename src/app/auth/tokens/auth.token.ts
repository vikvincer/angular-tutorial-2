import { InjectionToken } from "@angular/core";
import type { Auth } from "firebase/auth";

export const AUTH_SERVICE = new InjectionToken<Auth>('AUTH_SERVICE');
