import { Injectable } from '@angular/core';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { IReserve } from '../../reservation/models/iReserve';

@Injectable()
export class MomentService {

    public moment;

    private format = 'DD/MM/YYYY';

    constructor() {
        this.moment = extendMoment(Moment);
    }

    selectedDateOverlabReservedDate(reservedDate: IReserve, selectedDate: IReserve) {
        const compareBeginDate = this.getMomentDate(selectedDate.beginDate);
        const compareEndDate = this.getMomentDate(selectedDate.endDate);
        const startDate = this.getMomentDate(reservedDate.beginDate);
        const endDate = this.getMomentDate(reservedDate.endDate);

        // const beginIsUnavailable = compareBeginDate
        //     .isBetween(startDate, endDate, null, '[]');
        // const endIsUnavailable = compareEndDate
        //     .isBetween(startDate, endDate, null, '[]');

        // return beginIsUnavailable || endIsUnavailable;

        const reservedRange = this.moment.range(
            startDate,
            endDate
        );
        const selectedRange = this.moment.range(
            compareBeginDate,
            compareEndDate
        );
        const isOverlaps = selectedRange.overlaps(reservedRange, { adjacent: true });
        return isOverlaps;
    }

    getMomentDate(date: {
        year: number;
        month: number;
        day: number;
    }) {
        return this.moment(`${date.day}/${date.month}/${date.year}`, this.format);
    }

    isPast(beginReservedDate) {
        return this.moment().startOf('day').diff(this.getMomentDate(beginReservedDate), 'days') >= 0;
    }

    getEpocToDate(epoc) {
        const date = this.moment.unix(epoc);
        return {
            year: date.year(),
            month: date.month() + 1,
            day: date.date(),
        };
    }

}
