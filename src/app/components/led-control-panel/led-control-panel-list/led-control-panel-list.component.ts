import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
  selector: 'app-led-control-panel-list',
  templateUrl: './led-control-panel-list.component.html',
  styleUrls: ['./led-control-panel-list.component.css']
})
export class LedControlPanelListComponent implements OnInit {

  server = '';
  uri = '';
  constructor() {
  }

  ngOnInit() {
  }
}
