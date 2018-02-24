import { AlertsService } from '@jaspero/ng2-alerts';
import { LOGIN } from './../../../../stores/auth.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    passwordForm: FormGroup;
    isLoggedIn = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private store: Store<AppState>,
        private alert: AlertsService
    ) {}

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            password: ''
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();
        if (this.authService.login(this.passwordForm.get('password').value)) {
            this.isLoggedIn = true;
            this.store.dispatch({ type: LOGIN });
            this.router.navigate(['reservation/overview']);
        } else {
            this.alert.create('error', 'invalid');
        }
    }

}
