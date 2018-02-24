import { GuestGuard } from './services/guest.guard';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoggedinGuard } from './services/loggedin.guard';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ModalModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        LoginPageComponent,
        LoginComponent,
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        AuthService,
        LoggedinGuard,
        GuestGuard
    ]
})
export class AuthModule { }
