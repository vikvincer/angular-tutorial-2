import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth/auth.service';
import type { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$();
  navItems = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Profile', link: '/profiles' },
    { name: 'Articles', link: '/articles' }
  ];
  ngOnInit() {
    console.log('AppComponent initialized');
  }
  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth']);
    }).catch((error) => {});
  }
}
