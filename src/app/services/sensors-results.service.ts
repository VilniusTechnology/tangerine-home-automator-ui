import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SensorsResultsService {

  data;

    constructor() {
      this.data = {};
    }

    set(data) {
      this.data = data;
    }

    get() {
      return this.data;
    }

}
