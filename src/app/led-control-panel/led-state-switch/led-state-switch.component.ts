import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-led-state-switch',
    templateUrl: './led-state-switch.component.html',
    styleUrls: ['./led-state-switch.component.css']
})
export class LedStateSwitchComponent implements OnInit {

    @Input('state') public ledState: number = 0;

    @Output() public change = new EventEmitter();

    public currentColor: string = 'white';

    constructor() {}

    ngOnInit() {
    }

    dispatchLedControlAction() {
        this.change.emit(this.ledState);
    }

}
