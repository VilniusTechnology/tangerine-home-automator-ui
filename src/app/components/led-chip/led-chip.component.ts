import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-led-chip',
  templateUrl: './led-chip.component.html',
  styleUrls: ['./led-chip.component.scss']
})
export class LedChipComponent implements OnInit {

    @Input('ledColor') ledColor: string = 'black';
    @Input('ledColorColdWhite') ledColorColdWhite: string = 'black';
    @Input('ledColorWarmWhite') ledColorWarmWhite: string = 'black';

    constructor() { }

    ngOnInit() {
    }

}
