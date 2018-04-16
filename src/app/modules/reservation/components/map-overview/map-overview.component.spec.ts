import { Router } from '@angular/router';
import { ReservationService } from './../../services/reservation.service';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverviewComponent } from './map-overview.component';
import { BuildingBoxComponent } from '../building-box/building-box.component';
import { BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';

describe('MapOverviewComponent', () => {
    let component: MapOverviewComponent;
    let fixture: ComponentFixture<MapOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapOverviewComponent,
                BuildingBoxComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                BsDatepickerModule,
                NgxMyDatePickerModule,
                MyDateRangePickerModule,
                TooltipModule.forRoot()
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {}
                },
                {
                    provide: ReservationService,
                    useValue: {
                        getReservationByBuilding: () => Promise.resolve([]),
                        getStatusByDateRangeSelected: () => Promise.resolve([]),
                        getReservationList: () => Promise.resolve([]),
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.reservationList).toEqual([]);
    });

    describe('onDateRangeChanged()', () => {
        it('should be set date selected on value changed', () => {
            const selected = <any> {
                beginJsDate: '',
                endJsDate: '',
                beginDate: {
                    year: 2018,
                    month: 4,
                    day: 1
                },
                endDate: {
                    year: 2018,
                    month: 4,
                    day: 15
                }
            };
            component.onDateRangeChanged(selected);
            expect(component.dateSelected).toEqual(selected);
        });
    });
});
