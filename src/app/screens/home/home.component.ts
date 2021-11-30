import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import {interval, Subject} from "rxjs";
import {IMqttMessage, MqttService} from "ngx-mqtt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hosts = [];
  public zones = [];
  public zonesProms = [];
  public results = {};
  public temperature;
  public humidity;
  public weatherPayload;
  public interval;

  private baseUrl: string;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private  httpClient:  HttpClient,
    private endpointsService: EndpointsService,
    private mqttService: MqttService
  ) { }

  ngOnInit() {
    this.subscribeToHosts();
    // this.interval = setInterval(() => {
    //   this.subscribeToHosts();
    //   }, environment.endpoints.sensorCheckPeriod);
  }

  ngOnDestroy() {
    clearTimeout(this.interval);
  }

  subscribeToHosts() {
    this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');

    this.hosts = [];
    _.forEach(environment.endpoints.sensors.servers, (room) => {
      this.hosts.push(room);

      room.zones.forEach((zone) => {
        if (zone.type == 'http') {
          this.subscribeToHttp(room, zone);
        }

        if (zone.type == 'mqtt') {
          const path = `${zone.base}/${zone.room}/${zone.path}`;

          this.mqttService.publish(path + '/availability', 'online');
          this.mqttService.observe(path).subscribe((message: IMqttMessage) => {
            this.results[room.title + zone.id] = JSON.parse(message.payload.toString());
          });
        }
      });

    });
  }

  subscribeToHttp(room, zone) {
    setInterval(() => {
      this.httpClient.get(`${room.url}${room.uri}${zone.path}`)
        .subscribe((rawData: any) => {
          this.results[room.title + zone.id] = rawData;
        });
    }, environment.endpoints.sensorCheckPeriod);
  }

  metricIsDefined(data, a, b) {
    if (data[a] !== undefined && data[a][b] !== undefined) {
      return true;
    }

    return false;
  }

}
