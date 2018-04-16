import { ReserveType } from './../../models/reserve.enum';
import { ReservationService } from './../../services/reservation.service';
import { PopoverModule, TooltipModule, BsDatepickerModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCardComponent } from './reserve-card.component';
import { AuthService } from '../../../auth/services/auth.service';

describe('ReserveCardComponent', () => {
    let component: ReserveCardComponent;
    let fixture: ComponentFixture<ReserveCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReserveCardComponent ],
            imports: [
                PopoverModule.forRoot(),
                TooltipModule.forRoot(),
                BsDatepickerModule,
                ModalModule.forRoot()
            ],
            providers: [
                {
                    provide: ReservationService,
                    useValue: {
                        remove: (r) => {}
                    }
                },
                {
                    provide: AuthService,
                    useValue: {}
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReserveCardComponent);
        component = fixture.componentInstance;
        component.result = {
            reserve: {
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
            },
            status: ReserveType.available
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('openEditReserveDialog()', () => {
        it('should be call show()', () => {
            const showSpy = spyOn(component.modalService, 'show');
            component.openEditReserveDialog(null, null);
            expect(showSpy).toHaveBeenCalled();
        });
    });

    describe('remove()', () => {
        it('should be call remove() and emit update', () => {
            const removeSpy = spyOn(component.reservationService, 'remove');
            const emitSpy = spyOn(component.updated, 'emit');
            component.removeReserve(null);
            expect(removeSpy).toHaveBeenCalled();
            expect(emitSpy).toHaveBeenCalled();
        });
    });
});
