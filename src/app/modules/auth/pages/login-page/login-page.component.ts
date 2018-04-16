import { AppState } from './../../../../stores/app.state';
import { SETTING_END, SETTING_UP } from './../../../../stores/setting.reducer';
import { AlertsService } from '@jaspero/ng2-alerts';
import { LOGIN_SUCCESS } from './../../../../stores/auth.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    passwordForm: FormGroup;
    isLoggedIn = false;

    private settingSubscription: Subscription;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private store: Store<AppState>,
        public alert: AlertsService
    ) {}

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            password: ''
        });
        this.settingSubscription = this.store.select('setting').subscribe(action => {
            if (action === SETTING_END) {
                this.router.navigate(['reservation/overview']);
            }
        });
    }

    ngOnDestroy() {
        this.settingSubscription.unsubscribe();
    }

    onSubmit(e: Event) {
        e.preventDefault();
        if (this.authService.login(this.passwordForm.get('password').value)) {
            this.isLoggedIn = true;
            this.store.dispatch({ type: LOGIN_SUCCESS });
            this.store.dispatch({ type: SETTING_UP });
        } else {
            this.alert.create('error', '');
        }
        this.passwordForm.reset();
    }

}
