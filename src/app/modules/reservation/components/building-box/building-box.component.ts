import { ReserveType } from './../../models/reserve.enum';
import { ReservationService } from './../../services/reservation.service';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IReserve } from '../../models/iReserve';

@Component({
  selector: 'app-building-box',
  templateUrl: './building-box.component.html',
  styleUrls: ['./building-box.component.scss']
})
export class BuildingBoxComponent implements OnInit, OnChanges {

    @Input() no: string;
    @Input() dateSelected: IMyDateRangeModel;

    public status = '';
    public results = {
        results: [],
        statusList: {
            available: false,
            unavailable: false,
            reserved: false
        }
    };
    public reservationList: IReserve[] = [];

    constructor(
        public router: Router,
        public reservationService: ReservationService
    ) { }

    ngOnInit() {
        this.reservationService.getReservationByBuilding(this.no).then(results => {
            this.reservationList = results;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dateSelected'] && this.dateSelected) {
            this.checkIsAvailable();
        }
    }

    checkIsAvailable() {
        if (this.dateSelected.beginJsDate === null || this.dateSelected.endJsDate === null) {
            this.resetStatus();
            return;
        }

        this.reservationService.getStatusByDateRangeSelected({
            no: this.no,
            beginDate: this.dateSelected.beginDate,
            endDate: this.dateSelected.endDate
        }).then((results) => {
            this.results = results;
            this.status = (this.results.statusList.unavailable || this.results.statusList.reserved) ? 'unavailable' : 'available';
        });
    }

    resetStatus() {
        this.status = '';
        this.results = {
            results: [],
            statusList: {
                available: false,
                unavailable: false,
                reserved: false
            }
        };
    }

    open() {
        let beginEpoc = null,
            endEpoc = null;

        if (this.dateSelected) {
            beginEpoc = this.dateSelected.beginEpoc;
            endEpoc = this.dateSelected.endEpoc;
        }

        this.router.navigate(['reservation/building', this.no], {
            queryParams: {
                beginEpoc,
                endEpoc
            }
        });
    }

}
