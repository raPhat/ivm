import { QuillModule } from 'ngx-quill';
import { BsDatepickerModule, ModalModule, BsModalRef } from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MyDateRangePickerModule, MyDateRangePicker } from 'mydaterangepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReservationService } from './../../services/reservation.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveModalComponent } from './reserve-modal.component';

describe('ReserveModalComponent', () => {
    let component: ReserveModalComponent;
    let fixture: ComponentFixture<ReserveModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReserveModalComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MyDateRangePickerModule,
                NgxMyDatePickerModule,
                BsDatepickerModule.forRoot(),
                QuillModule,
                ModalModule.forRoot()
            ],
            providers: [
                {
                    provide: ReservationService,
                    useValue: {
                        getReservationByBuilding: () => Promise.resolve([]),
                        update: () => {},
                        reserve: () => {}
                    }
                },
                BsModalRef
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReserveModalComponent);
        component = fixture.componentInstance;
        component.reserve = {
            no: 'c2',
            beginDate: {
                year: 2018,
                month: 3,
                day: 1
            },
            endDate: {
                year: 2018,
                month: 3,
                day: 30
            }
        };
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

    describe('submit()', () => {
        it('should be call goToReserve() method by `new` mode', () => {
            const submitSpy = spyOn(component, 'goToReserve');
            component.mode = 'new';
            component.submit();
            expect(submitSpy).toHaveBeenCalled();
        });
        it('should be call goToEdit() method by `edit` mode', () => {
            const submitSpy = spyOn(component, 'goToEdit');
            component.mode = 'edit';
            component.submit();
            expect(submitSpy).toHaveBeenCalled();
        });
    });

    describe('goToReserve()', () => {
        it('should be call reserve() and hide modal', () => {
            const submitSpy = spyOn(component.reserveService, 'reserve');
            const hideSpy = spyOn(component.modalRef, 'hide');
            component.goToReserve();
            expect(submitSpy).toHaveBeenCalled();
            expect(hideSpy).toHaveBeenCalled();
        });
    });

    describe('goToEdit()', () => {
        it('should be call reserve() and hide modal', () => {
            const submitSpy = spyOn(component.reserveService, 'update');
            const hideSpy = spyOn(component.modalRef, 'hide');
            component.goToEdit();
            expect(submitSpy).toHaveBeenCalled();
            expect(hideSpy).toHaveBeenCalled();
        });
    });
});
