import { DatabaseService } from './../../../shared/services/database.service';
import { ReservationService } from './../../services/reservation.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CommentCardComponent } from './../../components/comment-card/comment-card.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { ReserveCardComponent } from './../../components/reserve-card/reserve-card.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BuildingPageComponent } from './building-page.component';
import { OverviewPageComponent } from '../overview/overview-page.component';
import { MapOverviewComponent } from '../../components/map-overview/map-overview.component';
import { BuildingBoxComponent } from '../../components/building-box/building-box.component';
import { BuildingCardComponent } from '../../components/building-card/building-card.component';
import { ReserveModalComponent } from '../../components/reserve-modal/reserve-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReservationRoutingModule } from '../../reservation-routing.module';
import { BsDatepickerModule, TooltipModule, ModalModule, PopoverModule, BsModalService } from 'ngx-bootstrap';
import { MomentModule } from 'angular2-moment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuillModule } from 'ngx-quill';
import { CommentService } from '../../services/comment.service';
import { MomentService } from '../../../shared/services/moment.service';

describe('BuildingPageComponent', () => {
  let component: BuildingPageComponent;
  let fixture: ComponentFixture<BuildingPageComponent>;

  beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BuildingPageComponent,
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
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({
                            no: 'c1'
                        }),
                        queryParams: Observable.of({
                            beginEpoc: '',
                            endEpoc: ''
                        })
                    }
                },
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
                MomentService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuildingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getAllComments()', () => {
        it('should be get all comments by building no and set to allComments variable', fakeAsync(() => {
            spyOn(component.commentService, 'getCommentsByBuilding').and.returnValue(Promise.resolve([
                {
                    no: 'c1',
                    content: 'asd'
                }
            ]));
            component.getAllComments();
            tick();
            expect(component.allComments).toEqual([
                {
                    no: 'c1',
                    content: 'asd'
                }
            ]);
        }));
    });

    describe('comment()', () => {
        it('should be call comment service and re-call get all comment method', () => {
            const commentSpy = spyOn(component.commentService, 'comment');
            const formSpy = spyOn(component.commentForm, 'reset');
            const allSpy = spyOn(component, 'getAllComments');
            component.comment();
            expect(commentSpy).toHaveBeenCalled();
            expect(formSpy).toHaveBeenCalled();
            expect(allSpy).toHaveBeenCalled();
        });
    });

    describe('getAllReserved()', () => {
        it('should be get all reserve by building no and set to allReserved variable', fakeAsync(() => {
            spyOn(component.reservationService, 'getReservationByBuilding').and.returnValue(Promise.resolve([
                {
                    no: 'c1',
                    beginDate: {
                        year: 2018,
                        month: 4,
                        day: 1
                    },
                    endDate: {
                        year: 2018,
                        month: 4,
                        day: 30
                    }
                }
            ]));
            component.getAllReserved();
            expect(component.leftLoading).toBeTruthy();
            tick();
            expect(component.leftLoading).toBeFalsy();
            expect(component.allReserved).toEqual([
                {
                    no: 'c1',
                    beginDate: {
                        year: 2018,
                        month: 4,
                        day: 1
                    },
                    endDate: {
                        year: 2018,
                        month: 4,
                        day: 30
                    }
                }
            ]);
        }));
    });

    describe('setChartData()', () => {
        it('should be separate type and set chart data', () => {
            component.allReserved = [
                {
                    no: 'c1',
                    companyType: 'a',
                    beginDate: {
                        year: 2018,
                        month: 4,
                        day: 1
                    },
                    endDate: {
                        year: 2018,
                        month: 4,
                        day: 30
                    }
                },
                {
                    no: 'c1',
                    companyType: 'a',
                    beginDate: {
                        year: 2018,
                        month: 4,
                        day: 1
                    },
                    endDate: {
                        year: 2018,
                        month: 4,
                        day: 30
                    }
                },
                {
                    no: 'c1',
                    companyType: 'b',
                    beginDate: {
                        year: 2018,
                        month: 4,
                        day: 1
                    },
                    endDate: {
                        year: 2018,
                        month: 4,
                        day: 30
                    }
                }
            ];
            component.setChartData();
            expect(component.data).toEqual([
                { name: 'a', value: 2 },
                { name: 'b', value: 1 }
            ]);
        });
    });

    describe('onDateRangeChanged()', () => {
        it('should be set date selected and re-call checkIsAvailable() method', () => {
            const checkSpy = spyOn(component, 'checkIsAvailable');
            component.onDateRangeChanged(null);
            expect(component.dateSelected).toBeNull();
            expect(checkSpy).toHaveBeenCalled();
        });
    });

    describe('onUpdated()', () => {
        it('should be call getAllReserved() and call checkIsAvailable() method', () => {
            const allSpy = spyOn(component, 'getAllReserved');
            const checkSpy = spyOn(component, 'checkIsAvailable');
            component.onUpdated();
            expect(allSpy).toHaveBeenCalled();
            expect(checkSpy).toHaveBeenCalled();
        });
    });

    describe('checkIsAvailable()', () => {
        it('should be call resetStatus() if date not select', () => {
            const resetSpy = spyOn(component, 'resetStatus');
            component.dateSelected = <any> {
                beginJsDate: null,
                endJsDate: null
            };
            component.checkIsAvailable();
            expect(resetSpy).toHaveBeenCalled();
        });
        it('should be set unavailable status if date selected', fakeAsync(() => {
            component.dateSelected = <any> {
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

            // unavailable
            const reserveSpy1 = spyOn(component.reservationService, 'getStatusByDateRangeSelected').and.returnValue(Promise.resolve({
                results: [],
                statusList: {
                    available: false,
                    unavailable: true,
                    reserved: false
                }
            }));
            component.checkIsAvailable();
            expect(component.rightLoading).toBeTruthy();
            tick();
            expect(component.rightLoading).toBeFalsy();
            expect(reserveSpy1).toHaveBeenCalled();
            expect(component.results).toEqual({
                results: [],
                statusList: {
                    available: false,
                    unavailable: true,
                    reserved: false
                }
            });
            expect(component.status).toEqual('unavailable');
        }));
        it('should be set available status if date selected', fakeAsync(() => {
            component.dateSelected = <any> {
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

            // available
            const reserveSpy2 = spyOn(component.reservationService, 'getStatusByDateRangeSelected').and.returnValue(Promise.resolve({
                results: [],
                statusList: {
                    available: true,
                    unavailable: false,
                    reserved: false
                }
            }));
            component.checkIsAvailable();
            expect(component.rightLoading).toBeTruthy();
            tick();
            expect(component.rightLoading).toBeFalsy();
            expect(reserveSpy2).toHaveBeenCalled();
            expect(component.results).toEqual({
                results: [],
                statusList: {
                    available: true,
                    unavailable: false,
                    reserved: false
                }
            });
            expect(component.status).toEqual('available');
        }));
    });

    describe('resetStatus()', () => {
        it('should be set empty status and empty result', () => {
            component.resetStatus();
            expect(component.status).toEqual('');
            expect(component.results).toEqual({
                results: [],
                statusList: {
                    available: false,
                    unavailable: false,
                    reserved: false
                }
            });
        });
    });

    describe('reserve()', () => {
        it('should be set empty status and empty result', () => {
            component.dateSelected = <any> {
                beginJsDate: '',
                endJsDate: ''
            };
            const reserveSpy = spyOn(component.reservationService, 'reserve');
            const updateSpy = spyOn(component, 'onUpdated');
            component.reserve();
            expect(reserveSpy).toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalled();
        });
    });

    describe('openReserveDialog()', () => {
        it('should be call show method', () => {
            const modalSpy = spyOn(component.modalService, 'show');
            component.openReserveDialog(null);
            expect(modalSpy).toHaveBeenCalled();
        });
    });
});
