import { Router } from '@angular/router';
import { MomentService } from './../../../shared/services/moment.service';
import { CommentService } from './../../services/comment.service';
import { DatabaseService } from './../../../shared/services/database.service';
import { ReservationService } from './../../services/reservation.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOverviewComponent } from '../../components/map-overview/map-overview.component';
import { BuildingBoxComponent } from '../../components/building-box/building-box.component';
import { BuildingCardComponent } from '../../components/building-card/building-card.component';
import { ReserveModalComponent } from '../../components/reserve-modal/reserve-modal.component';
import { OverviewPageComponent } from './overview-page.component';
import { BuildingPageComponent } from '../building-page/building-page.component';
import { ReserveCardComponent } from '../../components/reserve-card/reserve-card.component';
import { CommentCardComponent } from '../../components/comment-card/comment-card.component';
import { QuillModule } from 'ngx-quill';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PopoverModule, ModalModule, BsDatepickerModule, TooltipModule, TooltipConfig } from 'ngx-bootstrap';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TranslateModule } from '@ngx-translate/core';
import { ReservationRoutingModule } from '../../reservation-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;

  beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            imports: [
                TranslateModule.forChild(),
                ReservationRoutingModule,
                BsDatepickerModule.forRoot(),
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
            providers: [
                {
                    provide: ReservationService,
                    useValue: {
                        getReservationByBuilding: (no) => Promise.resolve([]),
                        getStatusByDateRangeSelected: (no) => Promise.resolve([]),
                        reserve: (obj) => {}
                    }
                },
                DatabaseService,
                {
                    provide: CommentService,
                    useValue: {
                        getCommentsByBuilding: (no) => Promise.resolve([]),
                        comment: () => {}
                    }
                },
                MomentService,
                {
                    provide: Router,
                    useValue: {
                        navigate: (p1, p2) => {}
                    }
                },
                TooltipConfig
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewPageComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
