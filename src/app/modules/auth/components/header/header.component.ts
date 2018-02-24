import { Router } from '@angular/router';
import { LOGIN, LOGOUT } from './../../../../stores/auth.reducer';
import { DatabaseService } from './../../../shared/services/database.service';
import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

    modalRef: BsModalRef;
    passwordForm: FormGroup;
    databaseExist = false;
    databasePath: string;
    isLoggedIn = false;

    constructor(
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private databaseService: DatabaseService,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router,
        private alert: AlertsService
    ) {}

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn;
        this.store.select('auth').subscribe((action) => {
            if (action) {
                this.isLoggedIn = (action === LOGIN);
            }
        });
        this.passwordForm = this.formBuilder.group({
            password: ''
        });
        this.getDatabasePath();
    }

    logout(e) {
        e.preventDefault();
        this.authService.logout();
        this.store.dispatch({ type: LOGOUT });
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

    openDialog(e: Event, template) {
        e.preventDefault();
        this.modalRef = this.modalService.show(template);
    }

    updateDatabasePath(e: Event) {
        const target: any = e.target || e.srcElement;
        const file = target.files && target.files.length ? target.files[0] : null;
        if (file) {
            this.databasePath = file.path;
            console.log(this.databasePath);
        }
    }

    saveDatabasePath() {
        if (this.databasePath) {
            this.databaseService.setDatabasePath(this.databasePath);
            this.getDatabasePath();
        }
    }

}
