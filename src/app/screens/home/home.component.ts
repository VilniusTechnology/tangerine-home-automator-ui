import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import {MqttService} from "ngx-mqtt";
import {MqttConnectionService} from "../../services/mqtt-connection.service";
import {SensorsResultsService} from "../../services/sensors-results.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hosts = [];
  public zones = [];
  public results = {};
  public temperature;
  public humidity;
  public interval;

  private baseUrl: string;

  constructor(
    private  httpClient:  HttpClient,
    private endpointsService: EndpointsService,
    private mqtt: MqttService,
    private resultsSrv: SensorsResultsService,
    private mqttConnectionService: MqttConnectionService
  ) { }

  ngOnInit() {
    this.results = this.resultsSrv.get();

    this.subscribeToHosts();
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
          this.mqttConnectionService.requestSensorData(path).subscribe((rs) => {
            //@ts-ignore
            this.results[room.title + zone.id] = JSON.parse(rs);
            this.resultsSrv.set(this.results);
          });
        }
      });

    });
  }

  subscribeToHttp(room, zone) {
    this.httpClient.get(`${room.url}${room.uri}${zone.path}`)
      .subscribe((rawData: any) => {
        this.results[room.title + zone.id] = rawData;
        this.resultsSrv.set(this.results);
      });

    setInterval(() => {
      this.httpClient.get(`${room.url}${room.uri}${zone.path}`)
        .subscribe((rawData: any) => {
          this.results[room.title + zone.id] = rawData;
          this.resultsSrv.set(this.results);
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
