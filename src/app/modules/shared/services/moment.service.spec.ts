import { TestBed, inject } from '@angular/core/testing';

import { MomentService } from './moment.service';

describe('MomentService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MomentService]
        });
    });

    it('should be created', inject([MomentService], (service: MomentService) => {
        expect(service).toBeTruthy();
    }));

    describe('selectedDateOverlabReservedDate()', () => {
        it('should be TRUE if reserve date is overlay selected date', inject([MomentService], (service: MomentService) => {
            const isOverlay = service.selectedDateOverlabReservedDate({
                no: 'c1',
                beginDate: {
                    day: 1,
                    month: 2,
                    year: 2018
                },
                endDate: {
                    day: 28,
                    month: 2,
                    year: 2018
                }
            },
            {
                no: 'c1',
                beginDate: {
                    day: 1,
                    month: 1,
                    year: 2018
                },
                endDate: {
                    day: 30,
                    month: 4,
                    year: 2018
                }
            });
            expect(isOverlay).toBeTruthy();
        }));

        it('should be FALSE if reserve date is not overlay selected date', inject([MomentService], (service: MomentService) => {
            const isOverlay = service.selectedDateOverlabReservedDate({
                no: 'c1',
                beginDate: {
                    day: 1,
                    month: 5,
                    year: 2018
                },
                endDate: {
                    day: 31,
                    month: 5,
                    year: 2018
                }
            },
            {
                no: 'c1',
                beginDate: {
                    day: 1,
                    month: 1,
                    year: 2018
                },
                endDate: {
                    day: 30,
                    month: 4,
                    year: 2018
                }
            });
            expect(isOverlay).toBeFalsy();
        }));
    });

    describe('getMomentDate()', () => {
        it('should be get moment object from date object', inject([MomentService], (service: MomentService) => {
            const momentDate = service.getMomentDate({
                year: 2018,
                month: 4,
                day: 15
            });
            expect(typeof momentDate).toBe('object');
            expect(momentDate.weekday()).toBe(0); // 0 is Sunday, It's moment function.
        }));
    });

    describe('isPast()', () => {
        it('should be get TRUE if date is past', inject([MomentService], (service: MomentService) => {
            expect(service.isPast({
                year: 2018,
                month: 4,
                day: 14
            })).toBeTruthy();
        }));
        it('should be get FALSE if date is future', inject([MomentService], (service: MomentService) => {
            expect(service.isPast({
                year: 2019,
                month: 4,
                day: 14
            })).toBeFalsy();
        }));
    });

    describe('getEpocToDate()', () => {
        it('should be get date object', inject([MomentService], (service: MomentService) => {
            const date = service.getEpocToDate('1523795291');
            expect(date.year).toEqual(2018);
            expect(date.month).toEqual(4);
            expect(date.day).toEqual(15);
        }));
    });
});
