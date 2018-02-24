import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    modalRef: BsModalRef;
    passwordForm: FormGroup;

    constructor(
        private modalService: BsModalService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            password: ''
        });
    }

    openChangePassword(e: Event, template) {
        e.preventDefault();
        this.modalRef = this.modalService.show(template);
    }

}
