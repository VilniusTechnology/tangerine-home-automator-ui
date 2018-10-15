import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {LightingLevel} from './lighting-level';

@Injectable({
  providedIn: 'root'
})
export class LightningLevelService {

  private baseUrl =  'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getInitialLightLevel() {
    let data = this.httpClient.get<LightingLevel[]>(`${this.baseUrl}/api/light`);
    // console.log('getInitialLightLevel()', data);
    return data;
  }
}