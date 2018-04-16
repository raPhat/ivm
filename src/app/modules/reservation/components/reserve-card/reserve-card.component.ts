import { IReserveWithStatus } from './../../models/iReserveWithStatus';
import { ReserveType } from './../../models/reserve.enum';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ReserveModalComponent } from '../reserve-modal/reserve-modal.component';

@Component({
  selector: 'app-reserve-card',
  templateUrl: './reserve-card.component.html',
  styleUrls: ['./reserve-card.component.scss']
})
export class ReserveCardComponent implements OnInit {

    @Input() result: IReserveWithStatus;
    @Input() no: any;
    @Input() dateSelected: IMyDateRangeModel;

    @Output() updated = new EventEmitter();

    private modalRef: BsModalRef;
    private hiddenSubscription: Subscription;

    public beginDate = '';
    public endDate = '';
    public isOpen = false;
    public ReserveType = ReserveType;

    constructor(
        public reservationService: ReservationService,
        public modalService: BsModalService,
    ) { }

    ngOnInit() {
        // tslint:disable-next-line:max-line-length
        this.beginDate = `${this.result.reserve.beginDate.day}/${this.result.reserve.beginDate.month}/${this.result.reserve.beginDate.year}`;
        // tslint:disable-next-line:max-line-length
        this.endDate = `${this.result.reserve.endDate.day}/${this.result.reserve.endDate.month}/${this.result.reserve.endDate.year}`;
    }

    openEditReserveDialog(e: Event, reserve) {
        if (e) {
            e.preventDefault();
        }
        this.modalRef = this.modalService.show(ReserveModalComponent, {
            initialState: {
                no: this.no,
                dateSelected: this.dateSelected,
                mode: 'edit',
                reserve
            }
        });
        if (this.hiddenSubscription) {
            this.hiddenSubscription.unsubscribe();
        }
        this.hiddenSubscription = this.modalService.onHidden.subscribe(() => {
            this.updated.emit();
        });
    }

    removeReserve(reserve) {
        this.reservationService.remove(reserve);
        this.updated.emit();
    }

}
