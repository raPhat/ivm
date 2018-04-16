import { IComment } from './../../models/iComment';
import { CommentService } from './../../services/comment.service';
import { IReserve } from './../../models/iReserve';
import { Subscription } from 'rxjs/Subscription';
import { ReserveModalComponent } from './../../components/reserve-modal/reserve-modal.component';
import { ReserveType } from './../../models/reserve.enum';
import { ReservationService } from './../../services/reservation.service';
import { building } from './../../../../data/building';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { IBuilding } from '../../models/iBuilding';
import { ActivatedRoute } from '@angular/router';
import { MomentService } from '../../../shared/services/moment.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'app-building-page',
  templateUrl: './building-page.component.html',
  styleUrls: ['./building-page.component.scss']
})
export class BuildingPageComponent implements OnInit {

    @ViewChild('chart') chart;

    modalRef: BsModalRef;
    public building: IBuilding;
    public dateSelected: IMyDateRangeModel;
    public no = '';
    public status = '';
    public allReserved: IReserve[] = [];
    public allComments: IComment[] = [];
    public results = {
        results: [],
        statusList: {
            available: false,
            unavailable: false,
            reserved: false
        }
    };
    public rightLoading = false;
    public leftLoading = false;
    public data = [];
    public ReserveType = ReserveType;
    private hiddenSubscription: Subscription;
    public options = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'bullet' }],
            ['clean'],
        ]
    };
    public commentForm: FormGroup;

    myDateRangePickerOptions: IMyDrpOptions = {
        width: '100%',
        selectorHeight: 'auto',
        selectorWidth: 'calc(100% + 10px)',
        dateFormat: ' dd/mm/yyyy ',
    };

    model: Object = {};

    constructor(
        public route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public reservationService: ReservationService,
        public commentService: CommentService,
        private momentService: MomentService,
        public modalService: BsModalService,
    ) { }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
        this.route.params.subscribe(param => {
            this.no = param['no'];
            this.building = building[this.no];
            this.getAllReserved();
            this.getAllComments();
        });
        this.route.queryParams.subscribe(param => {
            if (param['beginEpoc'] && param['endEpoc']) {
                const beginDate = this.momentService.getEpocToDate(param['beginEpoc']);
                const endDate = this.momentService.getEpocToDate(param['endEpoc']);
                this.model = {
                    beginDate,
                    endDate,
                };
                this.dateSelected = <any> {
                    beginDate,
                    endDate,
                    beginEpoc: param['beginEpoc'],
                    endEpoc: param['endEpoc']
                };
                this.checkIsAvailable();
            }
        });
    }

    getAllComments() {
        this.commentService.getCommentsByBuilding(this.no).then(allComments => {
            this.allComments = allComments;
        });
    }

    comment() {
        this.commentService.comment({
            ...this.commentForm.value,
            no: this.no
        });
        this.commentForm.reset();
        this.getAllComments();
    }

    getAllReserved() {
        this.leftLoading = true;
        this.reservationService.getReservationByBuilding(this.no).then(allReserved => {
            this.leftLoading = false;
            this.allReserved = allReserved;
            this.setChartData();
        });
    }

    setChartData() {
        const datas = [];
        this.allReserved.map(r => {
            const data = _.find(datas, { 'name': r.companyType });
            if (data) {
                data.value++;
            } else {
                datas.push({
                    name: r.companyType || '',
                    value: 1
                });
            }
        });
        this.data = [...datas];
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        this.dateSelected = event;
        this.checkIsAvailable();
    }

    onUpdated() {
        this.getAllReserved();
        this.checkIsAvailable();
    }

    checkIsAvailable() {
        if (this.dateSelected.beginJsDate === null || this.dateSelected.endJsDate === null) {
            this.resetStatus();
            return;
        }

        this.rightLoading = true;
        this.reservationService.getStatusByDateRangeSelected({
            no: this.no,
            beginDate: this.dateSelected.beginDate,
            endDate: this.dateSelected.endDate
        }).then(results => {
            this.rightLoading = false;
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

    reserve() {
        this.reservationService.reserve({
            no: this.no,
            beginDate: this.dateSelected.beginDate,
            endDate: this.dateSelected.endDate
        });
        this.onUpdated();
    }

    openReserveDialog(e: Event) {
        if (e) {
            e.preventDefault();
        }
        this.modalRef = this.modalService.show(ReserveModalComponent, {
            initialState: {
                no: this.no,
                dateSelected: this.dateSelected,
                mode: 'new'
            }
        });
        if (this.hiddenSubscription) {
            this.hiddenSubscription.unsubscribe();
        }
        this.hiddenSubscription = this.modalService.onHidden.subscribe(() => {
            this.onUpdated();
        });
    }

}
