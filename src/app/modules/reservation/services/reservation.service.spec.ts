import { TestBed, inject, async } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { DatabaseService } from '../../shared/services/database.service';
import { MomentService } from './../../shared/services/moment.service';
import { building } from '../../../data/building';
import { ReserveType } from '../models/reserve.enum';

describe('ReservationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReservationService, DatabaseService, MomentService]
        });
    });

    it('should be created', inject([ReservationService], (service: ReservationService) => {
        expect(service).toBeTruthy();
    }));

    describe('getReservationList()', () => {
        it('should be get all reserve', async(inject([ReservationService], (service: ReservationService) => {
            const mock = [
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
                },
                {
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
                }
            ];
            const dbSpy = spyOn(service.db, 'getDatabase').and.returnValue(Promise.resolve({
                data: mock
            }));
            service.getReservationList().then((data) => {
                expect(data).toEqual(mock);
                expect(data.length).toEqual(2);
                expect(dbSpy).toHaveBeenCalled();
            });
        })));
    });

    describe('getReservationByBuilding()', () => {
        it('should be get all reserve of building by building no', async(inject([ReservationService], (service: ReservationService) => {
            const mock = [
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
                },
                {
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
                }
            ];
            const dbSpy = spyOn(service.db, 'getDatabase').and.returnValue(Promise.resolve({
                data: mock
            }));
            service.getReservationByBuilding('c2').then((data) => {
                expect(data).toEqual([
                    {
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
                    }
                ]);
                expect(data.length).toEqual(1);
                expect(dbSpy).toHaveBeenCalled();
            });
        })));
    });

    describe('reserve()', () => {
        it('should be save reserve', inject([ReservationService], (service: ReservationService) => {
            service.db.reservation = <any> {
                insert: (reservation) => {}
            };
            const mock = {
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
            const reservationSpy = spyOn(service.db.reservation, 'insert');
            const dbSpy = spyOn(service.db, 'saveDatabase');
            service.reserve(mock);
            expect(reservationSpy).toHaveBeenCalledWith(mock);
            expect(dbSpy).toHaveBeenCalled();
        }));
    });

    describe('update()', () => {
        it('should be update reserve', inject([ReservationService], (service: ReservationService) => {
            service.db.reservation = <any> {
                findOne: (obj) => {},
                update: (reservation) => {}
            };
            const mock = {
                $loki: 1,
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
            const updateSpy = spyOn(service.db.reservation, 'update');
            const findOneSpy = spyOn(service.db.reservation, 'findOne').and.returnValue(mock);
            const dbSpy = spyOn(service.db, 'saveDatabase');
            const updateMock = {
                $loki: 1,
                no: 'c2',
                name: 'Mollit',
                note: 'Mollit eiusmod proident nostrud non ullamco eiusmod.',
                companyType: 'IT',
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
            service.update(updateMock);
            expect(findOneSpy).toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalledWith(updateMock);
            expect(dbSpy).toHaveBeenCalled();
        }));
    });

    describe('remove()', () => {
        it('should be remove reserve', inject([ReservationService], (service: ReservationService) => {
            service.db.reservation = <any> {
                findOne: (obj) => {},
                remove: (reservation) => {}
            };
            const mock = {
                $loki: 1,
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
            const removeSpy = spyOn(service.db.reservation, 'remove');
            const findOneSpy = spyOn(service.db.reservation, 'findOne').and.returnValue(mock);
            const dbSpy = spyOn(service.db, 'saveDatabase');
            service.remove(mock);
            expect(findOneSpy).toHaveBeenCalled();
            expect(removeSpy).toHaveBeenCalledWith(mock);
            expect(dbSpy).toHaveBeenCalled();
        }));
    });

    describe('getStatusByDateRangeSelected()', () => {
        it('should be all reserve with status by date range selected', async(inject([ReservationService], (service: ReservationService) => {
            const mock = [
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
                },
                {
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
                {
                    no: 'c2',
                    beginDate: {
                        year: 2018,
                        month: 2,
                        day: 1
                    },
                    endDate: {
                        year: 2018,
                        month: 2,
                        day: 15
                    }
                }
            ];
            const dbSpy = spyOn(service.db, 'getDatabase').and.returnValue(Promise.resolve({
                data: mock
            }));
            service.getStatusByDateRangeSelected({
                no: 'c2',
                beginDate: {
                    year: 2018,
                    month: 1,
                    day: 1
                },
                endDate: {
                    year: 2018,
                    month: 3,
                    day: 30
                }
            }).then(data => {
                expect(data).toEqual({
                    results: [
                        {
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
                            status: ReserveType.unavailable
                        },
                        {
                            reserve: {
                                no: 'c2',
                                beginDate: {
                                    year: 2018,
                                    month: 2,
                                    day: 1
                                },
                                endDate: {
                                    year: 2018,
                                    month: 2,
                                    day: 15
                                }
                            },
                            status: ReserveType.unavailable
                        }
                    ],
                    statusList: {
                        available: false,
                        unavailable: true,
                        reserved: false,
                    }
                });
            });
        })));
    });
});
