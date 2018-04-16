import { RouterTestingModule } from '@angular/router/testing';
import { AlertsService } from '@jaspero/ng2-alerts';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './../../services/auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ModalModule, AlertModule } from 'ngx-bootstrap';
import { DatabaseService } from '../../../shared/services/database.service';
import { authReducer } from '../../../../stores/auth.reducer';
import { settingReducer } from '../../../../stores/setting.reducer';
import { APP_BASE_HREF } from '@angular/common';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                ModalModule.forRoot(),
                StoreModule.forRoot({
                    auth: authReducer,
                    setting: settingReducer
                }),
                AlertModule.forRoot()
            ],
            providers: [
                DatabaseService,
                AuthService,
                AlertsService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngAfterViewInit()', () => {
        it('should be call settingFirst() if is logged in', () => {
            const settingSpy = spyOn(component, 'settingFirst');
            component.isLoggedIn = true;
            component.ngAfterViewInit();
            expect(settingSpy).toHaveBeenCalled();
        });
        it('should be not call settingFirst() if is not logged in', () => {
            const settingSpy = spyOn(component, 'settingFirst');
            component.isLoggedIn = false;
            component.ngAfterViewInit();
            expect(settingSpy).not.toHaveBeenCalled();
        });
    });

    describe('settingFirst()', () => {
        it('should be open setting dialog if is not database exist', () => {
            const dialogSpy = spyOn(component, 'openDialog');
            component.databaseExist = false;
            component.settingFirst();
            expect(dialogSpy).toHaveBeenCalled();
        });
        it('should be not open setting dialog but dispatch store instead if is database exist', () => {
            const dialogSpy = spyOn(component, 'openDialog');
            const storeSpy = spyOn(component.store, 'dispatch');
            component.databaseExist = true;
            component.settingFirst();
            expect(storeSpy).toHaveBeenCalled();
            expect(dialogSpy).not.toHaveBeenCalled();
        });
    });

    describe('logout()', () => {
        it('should be call logout(), disapatch store and navigate router', () => {
            const logoutSpy = spyOn(component.authService, 'logout');
            const storeSpy = spyOn(component.store, 'dispatch');
            const routerSpy = spyOn(component.router, 'navigate');
            component.logout({
                preventDefault: () => {}
            });
            expect(logoutSpy).toHaveBeenCalled();
            expect(storeSpy).toHaveBeenCalled();
            expect(routerSpy).toHaveBeenCalled();
        });
    });

    describe('updateNewPassword()', () => {
        it('should be call savePassworrd(), reset form, hide modal and show alert', () => {
            component.modalRef = {
                hide: () => {}
            };
            const authSpy = spyOn(component.authService, 'savePassworrd');
            const formSpy = spyOn(component.passwordForm, 'reset');
            const modalSpy = spyOn(component.modalRef, 'hide');
            const alertSpy = spyOn(component.alert, 'create');
            component.updateNewPassword();
            expect(authSpy).toHaveBeenCalled();
            expect(formSpy).toHaveBeenCalled();
            expect(modalSpy).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalled();
        });
    });

    describe('getDatabasePath()', () => {
        it('should be call getDatabasePath() and set databaseExist is TRUE if path is exist', () => {
            const dbSpy = spyOn(component.databaseService, 'getDatabasePath').and.returnValue('/db/');
            component.getDatabasePath();
            expect(component.databasePath).toEqual('/db/');
            expect(component.databaseExist).toBeTruthy();
            expect(dbSpy).toHaveBeenCalled();
        });
        it('should be call getDatabasePath() and set databaseExist is FALSE if path is not exist', () => {
            const dbSpy = spyOn(component.databaseService, 'getDatabasePath').and.returnValue(undefined);
            component.getDatabasePath();
            expect(component.databasePath).toEqual(undefined);
            expect(component.databaseExist).toBeFalsy();
            expect(dbSpy).toHaveBeenCalled();
        });
    });

    describe('openDialog()', () => {
        it('should be call show() and create dialog', () => {
            const modalSpy = spyOn(component.modalService, 'show');
            component.openDialog(null, null, null);
            expect(modalSpy).toHaveBeenCalled();
        });
    });

    describe('updateDatabasePath()', () => {
        it('should be update databasePath by file src', () => {
            component.updateDatabasePath(<any> {
                target: {
                    files: [
                        {
                            path: '/new_db/'
                        }
                    ]
                }
            });
            expect(component.databasePath).toEqual('/new_db/');
        });
    });

    describe('saveDatabasePath()', () => {
        it('should be call logout(), disapatch store and navigate router if database path is exist', () => {
            const dbSpy = spyOn(component.databaseService, 'setDatabasePath');
            const storeSpy = spyOn(component.store, 'dispatch');
            const getSpy = spyOn(component, 'getDatabasePath');
            component.databasePath = '/db/';
            component.saveDatabasePath();
            expect(dbSpy).toHaveBeenCalled();
            expect(storeSpy).toHaveBeenCalled();
            expect(getSpy).toHaveBeenCalled();
        });
        it('should not be call logout(), disapatch store and navigate router if database path is not exist', () => {
            const dbSpy = spyOn(component.databaseService, 'setDatabasePath');
            const storeSpy = spyOn(component.store, 'dispatch');
            const getSpy = spyOn(component, 'getDatabasePath');
            component.databasePath = undefined;
            component.saveDatabasePath();
            expect(dbSpy).not.toHaveBeenCalled();
            expect(storeSpy).not.toHaveBeenCalled();
            expect(getSpy).not.toHaveBeenCalled();
        });
    });
});
