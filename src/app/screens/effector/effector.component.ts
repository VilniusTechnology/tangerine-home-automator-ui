import { Component, OnInit } from '@angular/core';
import { LightAutomatorConnectionService } from 'src/app/services/light-automator-connection.service';

@Component({
  selector: 'app-effector',
  templateUrl: './effector.component.html',
  styleUrls: ['./effector.component.scss']
})
export class EffectorComponent implements OnInit {

  constructor(
    private connectionService: LightAutomatorConnectionService
  ) { }

  ngOnInit() {
  }

  selectEffect(id) {
      this.connectionService.selectEffect(id).subscribe( (data) => {
          console.log('Got effect response: ', data);
      });
  }

  stopCurrentEffect() {

  }
}
