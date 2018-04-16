import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import { NgxTransitionModule } from 'ngx-transition';
import { AuthModule } from './modules/auth/auth.module';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ElectronService } from 'app/providers/electron.service';
import { TranslateModule } from '@ngx-translate/core';
import { authReducer } from './stores/auth.reducer';
import { settingReducer } from './stores/setting.reducer';
import 'rxjs/add/observable/of';

describe('AppComponent', () => {
    let component: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AppComponent
        ],
        providers : [
            ElectronService
        ],
        imports: [
            RouterTestingModule,
            TranslateModule.forRoot(),
            JasperoAlertsModule,
            AuthModule,
            NgxTransitionModule,
            StoreModule.forRoot({
                auth: authReducer,
                setting: settingReducer
            }),
        ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    describe('ngOninit()', () => {
        it('should call not store and set loggedIn is FALSE', async(() => {
            const storeSpy = spyOn(component.store, 'select').and.returnValue(Observable.of(false));
            component.ngOnInit();
            expect(component.isLoggedIn).toBeFalsy();
        }));
        it('should call store with `success` and set loggedIn is TRUE', async(() => {
            const storeSpy = spyOn(component.store, 'select').and.returnValue(Observable.of(true));
            component.ngOnInit();
            expect(component.isLoggedIn).toBeTruthy();
        }));
    });
});
