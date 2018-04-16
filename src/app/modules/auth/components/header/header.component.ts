import { AppState } from './../../../../stores/app.state';
import { SETTING_END, SETTING_UP } from './../../../../stores/setting.reducer';
import { Router } from '@angular/router';
import { LOGOUT_SUCCESS } from './../../../../stores/auth.reducer';
import { DatabaseService } from './../../../shared/services/database.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { AlertsService } from '@jaspero/ng2-alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

    @ViewChild('settingsTemplate') settingsTemplate;

    modalRef: BsModalRef;
    passwordForm: FormGroup;
    databaseExist = false;
    databasePath: string;
    isLoggedIn = false;

    constructor(
        public modalService: BsModalService,
        private formBuilder: FormBuilder,
        public databaseService: DatabaseService,
        public authService: AuthService,
        public store: Store<AppState>,
        public router: Router,
        public alert: AlertsService
    ) {}

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn;
        this.passwordForm = this.formBuilder.group({
            password: ''
        });
        this.getDatabasePath();
    }

    ngAfterViewInit() {
        if (this.isLoggedIn) {
            this.settingFirst();
        }
    }

    settingFirst() {
        if (!this.databaseExist) {
            this.openDialog(null, this.settingsTemplate, {
                ignoreBackdropClick: true
            });
        } else {
            this.store.dispatch({ type: SETTING_END });
        }
    }

    logout(e) {
        e.preventDefault();
        this.authService.logout();
        this.store.dispatch({ type: LOGOUT_SUCCESS });
        this.router.navigate(['auth/login']);
    }

    updateNewPassword() {
        this.authService.savePassworrd(this.passwordForm.get('password').value);
        this.passwordForm.reset();
        this.modalRef.hide();
        this.alert.create('success', 'password changed.');
    }

    getDatabasePath() {
        this.databasePath = this.databaseService.getDatabasePath();
        this.databaseExist = !!this.databasePath;
    }

    openDialog(e: Event, template, config) {
        if (e) {
            e.preventDefault();
        }
        this.modalRef = this.modalService.show(template, config);
    }

    updateDatabasePath(e: Event) {
        const target: any = e.target || e.srcElement;
        const file = target.files && target.files.length ? target.files[0] : null;
        if (file) {
            this.databasePath = file.path;
        }
    }

    saveDatabasePath() {
        if (this.databasePath) {
            this.databaseService.setDatabasePath(this.databasePath);
            this.getDatabasePath();
            this.store.dispatch({ type: SETTING_END });
        }
    }

}
