import { OnInit } from '@angular/core';
import {Component} from '@angular/core';


export interface LedLightingState {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
  selector: 'app-lightomator',
  templateUrl: './lightomator.component.html',
  styleUrls: ['./lightomator.component.css']
})
export class LightomatorComponent implements OnInit {

    constructor(

    ) { }

    ngOnInit() {
    }
}
