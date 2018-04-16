import { IReserve } from './../../models/iReserve';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent implements OnInit {

    myDateRangePickerOptions: IMyDrpOptions = {
        width: '100%',
        selectorHeight: 'auto',
        selectorWidth: 'calc(100% + 10px)',
        dateFormat: ' dd mmm yyyy ',
    };

    private date = new Date();
    model: Object = {
        // beginDate: {
        //     year: this.date.getFullYear(),
        //     month: this.date.getMonth() + 1,
        //     day: this.date.getDate()
        // },
        // endDate: {
        //     year: this.date.getFullYear(),
        //     month: this.date.getMonth() + 1,
        //     day: this.date.getDate()
        // }
    };

    public dateSelected: IMyDateRangeModel;
    public reservationList: IReserve[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private reservationService: ReservationService
    ) {}

    ngOnInit() {
        this.reservationService.getReservationList().then(results => {
            this.reservationList = results;
        });
        // this.setDisableDateRanges();
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        this.dateSelected = event;
    }

    // private setDisableDateRanges() {
    //     this.myDateRangePickerOptions.disableDateRanges = <any> this.reservationList.map((r: IReserve) => {
    //         return {
    //             beginDate: r.beginDate,
    //             endDate: r.endDate
    //         };
    //     });
    // }

}
