import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgxTransitionModule } from 'ngx-transition';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { AuthModule } from './modules/auth/auth.module';
import { ModalModule } from 'ngx-bootstrap';

import { ElectronService } from './providers/electron.service';
import { DatabaseService } from './modules/shared/services/database.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './stores/auth.reducer';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations : [
        AppComponent, HomeComponent, WebviewDirective
    ],
    imports : [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        NgxTransitionModule,
        AuthModule,
        StoreModule.forRoot({ auth: authReducer }),
        JasperoAlertsModule
    ],
    providers : [
        ElectronService,
        DatabaseService
    ],
    bootstrap : [AppComponent]
})
export class AppModule { }
