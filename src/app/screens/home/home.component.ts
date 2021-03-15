import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import {interval, Subject} from "rxjs";

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
    private endpointsService: EndpointsService
  ) { }

  ngOnInit() {
    this.subscribeToHosts();
    this.interval = setInterval(() => {
      this.subscribeToHosts();
      }, environment.endpoints.sensorCheckPeriod);
  }

  ngOnDestroy() {
    clearTimeout(this.interval);
  }

  subscribeToHosts() {
    this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');

    this.hosts = [];
    _.forEach(environment.endpoints.sensors.servers, (item) => {
      this.hosts.push(item);

      item.zones.forEach((i) => {
        // console.log('item: ', item);
        // console.log('i: ', i);
        // const prm = new Promise( (resolve, reject) => {
          this.httpClient.get(`${item.url}${item.uri}${i.path}`)
            .subscribe((rawData: any) => {
              this.results[i.id] = rawData;
              // resolve({id: i.id, uri: item.uri, data: rawData})
            });
        // });

        // this.zonesProms.push(prm);
      });

    });
  }

  metricIsDefined(data, a, b) {
    if (data[a] !== undefined && data[a][b] !== undefined) {
      return true;
    }

    return false;
  }

}
