import { Injectable } from '@angular/core';

import { HttpClient} from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AutomatorMainResponse } from './entities/AutomatorMainResponse';

@Injectable({
  providedIn: 'root'
})

export class MainTransportService {

  constructor(private  httpClient:  HttpClient) { }

  getData(): Observable<AutomatorMainResponse> {
    let apiUrl = 'http://192.168.1.47:8080/';

    return this.httpClient.get<AutomatorMainResponse>(apiUrl);
  }
}
