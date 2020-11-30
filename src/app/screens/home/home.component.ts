import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public temperature;
  public humidity;
  public weatherPayload;

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

    this.weatherPayload = {};

  //   const authReq = req.clone({
  //     headers: new HttpHeaders({
  //         'Auth-token': this.authService.getCredentials().token,
  //         'Auth-email': this.authService.getCredentials().email,
  //     })
  // });
  const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
  const promW = this.httpClient.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=54.775950&lon=25.2141357&cnt=10&appid=7860105605c7ddd1b57a56ded90e8a05`, {
      headers: headers
   });
    promW.subscribe((rawData: any) => {
                console.log('this.weatherPayload: ', rawData);
                this.weatherPayload = rawData;
            });
  }

}
