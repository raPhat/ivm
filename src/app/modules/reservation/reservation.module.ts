import { BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { ReservationRoutingModule } from './reservation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

// components
import { OverviewPageComponent } from './pages/overview/overview-page.component';
import { MapOverviewComponent } from './components/map-overview/map-overview.component';
import { BuildingBoxComponent } from './components/building-box/building-box.component';
import { BuildingCardComponent } from './components/building-card/building-card.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        ReservationRoutingModule,
        BsDatepickerModule,
        TooltipModule,
        ReactiveFormsModule,
        MomentModule
    ],
    declarations: [
        OverviewPageComponent,
        MapOverviewComponent,
        BuildingBoxComponent,
        BuildingCardComponent
    ]
})
export class ReservationModule { }
