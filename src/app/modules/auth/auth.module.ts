import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ModalModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginPageComponent,
        LoginComponent,
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class AuthModule { }
