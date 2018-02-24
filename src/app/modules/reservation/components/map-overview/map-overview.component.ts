import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent implements OnInit {

    dateSelected: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.dateSelected = this.formBuilder.group({
            date: new Date()
        });
    }

    setCurrentDate() {
        this.dateSelected.get('date').patchValue(new Date());
    }

}
