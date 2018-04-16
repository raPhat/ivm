import { GuestGuard } from './modules/auth/services/guest.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedinGuard } from './modules/auth/services/loggedin.guard';

const routes: Routes = [
  {
    path: 'reservation',
    canActivate: [LoggedinGuard],
    loadChildren: 'app/modules/reservation/reservation.module#ReservationModule',
  },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: 'app/modules/auth/auth.module#AuthModule',
  },
  { path: '',   redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**',   redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
