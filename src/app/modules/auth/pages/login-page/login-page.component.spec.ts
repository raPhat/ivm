import { AlertsService } from '@jaspero/ng2-alerts';
import { ModalModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { authReducer } from '../../../../stores/auth.reducer';
import { settingReducer } from '../../../../stores/setting.reducer';

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginPageComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                ModalModule,
                StoreModule.forRoot({
                    auth: authReducer,
                    setting: settingReducer
                }),
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {}
                },
                {
                    provide: AuthService,
                    useValue: {
                        login: (p) => {}
                    }
                },
                AlertsService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onSubmit()', () => {
        it('should be login on submit and set isLoggedIn = true if login success and reset form', () => {
            const authSpy = spyOn(component.authService, 'login').and.returnValue(true);
            const formSpy = spyOn(component.passwordForm, 'reset');
            component.onSubmit(<any> {
                preventDefault: () => {}
            });
            expect(authSpy).toHaveBeenCalled();
            expect(formSpy).toHaveBeenCalled();
            expect(component.isLoggedIn).toBeTruthy();
        });
        it('should be open alert if login fail and reset form', () => {
            const authSpy = spyOn(component.authService, 'login').and.returnValue(false);
            const formSpy = spyOn(component.passwordForm, 'reset');
            const alertSpy = spyOn(component.alert, 'create');
            component.onSubmit(<any> {
                preventDefault: () => {}
            });
            expect(authSpy).toHaveBeenCalled();
            expect(formSpy).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalled();
            expect(component.isLoggedIn).toBeFalsy();
        });
    });
});
