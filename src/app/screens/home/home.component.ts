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

  private baseUrl: string;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private  httpClient:  HttpClient,
    private endpointsService: EndpointsService
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.subscribeToHosts();
      }, 2500);
  }

  subscribeToHosts() {
    this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');

    this.hosts = [];
    _.forEach(environment.endpoints.sensors.servers, (item) => {
      this.hosts.push(item);

      item.zones.forEach((i) => {

        this.httpClient.get(`${item.url}/${item.uri}`)
          .subscribe((rawData: any) => {
            this.results[i.id] = rawData;
          });

        // this.zonesProms.push(prm);
        // https://stackoverflow.com/questions/34980973/how-to-bind-a-promise-to-a-component-property
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
