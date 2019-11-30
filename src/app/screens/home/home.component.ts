import { Component, OnInit } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public temperature;
  public humidity;

  private baseUrl: string;

  constructor(
    private  httpClient:  HttpClient,
    private endpointsService: EndpointsService
  ) { }

  ngOnInit() {
    this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');

    const prom = this.httpClient.get(`${this.baseUrl}/sensors-atmo`);
            prom.subscribe((rawData: any) => {
                console.log(rawData);
                this.temperature = rawData.temperature_C;
                this.humidity = rawData.humidity;
            });
  }

}
