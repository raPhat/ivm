import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-building-box',
  templateUrl: './building-box.component.html',
  styleUrls: ['./building-box.component.scss']
})
export class BuildingBoxComponent implements OnInit {

    @Input() no: string;

    status = 'available';

    constructor() { }

    ngOnInit() {
    }

}
