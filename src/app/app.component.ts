import { AppState } from './stores/app.state';
import { LOGIN_SUCCESS } from './stores/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isLoggedIn = false;

    constructor(
        public electronService: ElectronService,
        private translate: TranslateService,
        public store: Store<AppState>,
        private authService: AuthService
    ) {

        translate.setDefaultLang('en');

        if (electronService.isElectron()) {
            console.log('Mode electron');
            // Check if electron is correctly injected (see externals in webpack.config.js)
            console.log('c', electronService.ipcRenderer);
            // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
            console.log('c', electronService.childProcess);
        } else {
            console.log('Mode web');
        }
    }

    ngOnInit() {
        this.store.select('auth').subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
        });
        if (this.authService.isLoggedIn) {
            this.store.dispatch({ type: LOGIN_SUCCESS });
        }
    }

}
