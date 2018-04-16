import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IReserve } from './../../models/iReserve';
import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import * as _ from 'lodash';

@Component({
  selector: 'app-reserve-modal',
  templateUrl: './reserve-modal.component.html',
  styleUrls: ['./reserve-modal.component.scss']
})
export class ReserveModalComponent implements OnInit {

    public dateSelected: IMyDateRangeModel;
    public no = '';
    public mode: 'new' | 'edit';
    public reserve: IReserve;
    public options = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'bullet' }],
            ['clean'],
        ]
    };

    myDateRangePickerOptions: IMyDrpOptions = {
        width: '100%',
        selectorHeight: 'auto',
        selectorWidth: 'calc(100% + 10px)',
        dateFormat: ' dd mmm yyyy ',
    };

    model: any = {};

    list = [];

    public form: FormGroup;

    constructor(
        public modalRef: BsModalRef,
        public reserveService: ReservationService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        if (this.mode === 'new') {
            this.form = this.fb.group({
                name: ['', Validators.required],
                note: ['', Validators.required],
                companyType: ['', Validators.required],
            });
            this.model = {
                beginDate: this.dateSelected.beginDate,
                endDate: this.dateSelected.endDate
            };
        } else {
            this.form = this.fb.group({
                name: [this.reserve.name, Validators.required],
                note: [this.reserve.note, Validators.required],
                companyType: [this.reserve.companyType, Validators.required],
            });
            this.model = {
                beginDate: this.reserve.beginDate,
                endDate: this.reserve.endDate
            };
        }
        this.reserveService.getReservationByBuilding(this.no).then(list => {
            this.list = list;
        });
        this.myDateRangePickerOptions.disableDateRanges = this.list
            .filter(l => {
                if (this.mode === 'edit') {
                    // except date selected
                    if (
                        _.isEqual(l.beginDate, this.reserve.beginDate) &&
                        _.isEqual(l.endDate, this.reserve.endDate)
                    ) {
                        return false;
                    }
                }
                return true;
            })
            .map(l => {
                return {
                    beginDate: l.beginDate,
                    endDate: l.endDate
                };
            });
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        this.dateSelected = event;
    }

    submit() {
        if (this.mode === 'edit') {
            this.goToEdit();
        } else {
            this.goToReserve();
        }
    }

    goToReserve() {
        const data = this.form.value;
        this.reserveService.reserve({
            no: this.no,
            name: data['name'],
            note: data['note'],
            companyType: data['companyType'],
            beginDate: this.model.beginDate,
            endDate: this.model.endDate
        });
        this.modalRef.hide();
    }

    goToEdit() {
        const data = this.form.value;
        this.reserveService.update({
            ...this.reserve,
            no: this.no,
            name: data['name'],
            note: data['note'],
            companyType: data['companyType'],
            beginDate: this.model.beginDate,
            endDate: this.model.endDate
        });
        this.modalRef.hide();
    }

}
