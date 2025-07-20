import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guard/authGuard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-page/auth.page.route').then(m => m.routes),
  },
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.page.routes').then(m => m.routes),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.page.routes').then(m => m.routes),
    canActivate: [authGuard]
  },

  
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/not-found.page.routes').then(m => m.routes),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
