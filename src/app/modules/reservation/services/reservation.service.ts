import { Collection } from 'lokijs';
import { MomentService } from './../../shared/services/moment.service';
import { IReserve } from './../models/iReserve';
import { DatabaseService } from './../../shared/services/database.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ReserveType } from '../models/reserve.enum';

@Injectable()
export class ReservationService {

    list: IReserve[] = [
        {
            no: 'c1',
            name: 'Qui enim cupidatat laborum commodo',
            note: 'Nulla cupidatat laborum commodo aute dolor irure nulla sint do do.',
            companyType: 'software',
            beginDate: {
                year: 2018,
                month: 1,
                day: 1
            },
            endDate: {
                year: 2018,
                month: 1,
                day: 15
            }
        },
        {
            no: 'c1',
            name: 'Irure nulla',
            note: 'Qui sit do nostrud irure do eu proident non id ex laborum ipsum do.',
            companyType: 'software',
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
        {
            no: 'c1',
            name: 'Incididunt reprehenderit incididunt',
            note: 'Ullamco reprehenderit incididunt aute ex.',
            companyType: 'education',
            beginDate: {
                year: 2018,
                month: 3,
                day: 1
            },
            endDate: {
                year: 2018,
                month: 3,
                day: 15
            }
        },
        {
            no: 'c1',
            name: 'Reprehenderit',
            note: 'Reprehenderit incididunt aute ex.',
            companyType: 'software',
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
        },
        {
            no: 'c1',
            name: 'Aute',
            note: 'Incididunt aute ex.',
            companyType: 'education',
            beginDate: {
                year: 2018,
                month: 5,
                day: 1
            },
            endDate: {
                year: 2018,
                month: 5,
                day: 15
            }
        },
        {
            no: 'c1',
            name: 'Laborum',
            note: 'Cupidatat laborum commodo aute.',
            companyType: 'genral',
            beginDate: {
                year: 2018,
                month: 6,
                day: 1
            },
            endDate: {
                year: 2018,
                month: 6,
                day: 15
            }
        }
    ];

    private DBName = 'reservation';

    constructor(
        public db: DatabaseService,
        private momentService: MomentService
    ) { }

    getReservationList(): Promise<IReserve[]> {
        // return this.list;
        return this.db.getDatabase(this.DBName).then((table: any) => {
            return table.data;
        });
    }

    reserve(reserve: IReserve) {
        // this.list.push(reserve);
        this.db.reservation.insert(reserve);
        this.db.saveDatabase();
    }

    update(reserve: IReserve) {
        const r = this.db.reservation.findOne({'$loki': reserve.$loki});
        r.name = reserve.name;
        r.companyType = reserve.companyType;
        r.note = reserve.note;
        r.beginDate = reserve.beginDate;
        r.endDate = reserve.endDate;
        this.db.reservation.update(r);
        this.db.saveDatabase();
    }

    remove(reserve: IReserve) {
        const r = this.db.reservation.findOne({'$loki': reserve.$loki});
        this.db.reservation.remove(r);
        this.db.saveDatabase();
    }

    getReservationByBuilding(no: string): Promise<IReserve[]> {
        return this.getReservationList().then(list => {
            return _.filter(list, { no });
        });
    }

    getStatusByDateRangeSelected(selectedDate: IReserve) {
        return this.getReservationByBuilding(selectedDate.no).then(list => {
            const results = [];
            const statusList = [];

            list.forEach((reserveDate: IReserve) => {
                const containInBetween = this.momentService.selectedDateOverlabReservedDate(reserveDate, selectedDate);
                let type = ReserveType.available;

                if (containInBetween) {
                    if (this.momentService.isPast(reserveDate.beginDate)) {
                        type = ReserveType.unavailable;
                    } else {
                        type = ReserveType.reserved;
                    }
                    results.push({
                        reserve: reserveDate,
                        status: type
                    });
                    statusList.push(type);
                }
            });

            return {
                results: results,
                statusList: {
                    available: statusList.length === 0,
                    unavailable: statusList.includes(ReserveType.unavailable),
                    reserved: statusList.includes(ReserveType.reserved),
                }
            };
        });
    }

}
