import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-led-chip',
  templateUrl: './led-chip.component.html',
  styleUrls: ['./led-chip.component.scss']
})
export class LedChipComponent implements OnInit {

    ledColor: string = 'green';

    constructor() { }

    ngOnInit() {
    }

}
