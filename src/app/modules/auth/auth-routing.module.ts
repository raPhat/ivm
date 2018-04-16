import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// components
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class AuthRoutingModule { }
