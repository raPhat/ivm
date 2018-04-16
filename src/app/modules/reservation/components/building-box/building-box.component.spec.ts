import { ReservationService } from './../../services/reservation.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BuildingBoxComponent } from './building-box.component';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { Router } from '@angular/router';

describe('BuildingBoxComponent', () => {
    let component: BuildingBoxComponent;
    let fixture: ComponentFixture<BuildingBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BuildingBoxComponent
            ],
            imports: [
                TooltipModule.forRoot(),
                PopoverModule.forRoot(),
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {
                        navigate: (path) => {}
                    }
                },
                {
                    provide: ReservationService,
                    useValue: {
                        getReservationByBuilding: () => Promise.resolve([]),
                        getStatusByDateRangeSelected: () => Promise.resolve([])
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuildingBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
            tick();
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
            tick();
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

    describe('open()', () => {
        it('should be call navigate', () => {
            const routerSpy = spyOn(component.router, 'navigate');
            component.open();
            expect(routerSpy).toHaveBeenCalled();
        });
    });

    describe('ngOnChanges()', () => {
        it('should be call checkIsAvailable() on value changed', () => {
            const checkSpy = spyOn(component, 'checkIsAvailable');
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
            component.ngOnChanges({
                dateSelected: <any> component.dateSelected
            });
            expect(checkSpy).toHaveBeenCalled();
        });
    });
});
