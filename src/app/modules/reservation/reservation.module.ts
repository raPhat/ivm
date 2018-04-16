import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { BsDatepickerModule, TooltipModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { ReservationRoutingModule } from './reservation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuillModule } from 'ngx-quill';

// components
import { OverviewPageComponent } from './pages/overview/overview-page.component';
import { MapOverviewComponent } from './components/map-overview/map-overview.component';
import { BuildingBoxComponent } from './components/building-box/building-box.component';
import { BuildingCardComponent } from './components/building-card/building-card.component';
import { BuildingPageComponent } from './pages/building-page/building-page.component';

// services
import { ReservationService } from './services/reservation.service';
import { ReserveModalComponent } from './components/reserve-modal/reserve-modal.component';
import { ReserveCardComponent } from './components/reserve-card/reserve-card.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentService } from './services/comment.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        ReservationRoutingModule,
        BsDatepickerModule,
        TooltipModule,
        ReactiveFormsModule,
        FormsModule,
        MomentModule,
        NgxMyDatePickerModule,
        MyDateRangePickerModule,
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        NgxChartsModule,
        QuillModule
    ],
    declarations: [
        OverviewPageComponent,
        MapOverviewComponent,
        BuildingBoxComponent,
        BuildingCardComponent,
        BuildingPageComponent,
        ReserveModalComponent,
        ReserveCardComponent,
        CommentCardComponent
    ],
    providers: [
        ReservationService,
        CommentService
    ],
    entryComponents: [
        ReserveModalComponent
    ]
})
export class ReservationModule { }
