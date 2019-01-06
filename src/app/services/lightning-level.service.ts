import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {LightingLevel} from '../models/lighting-level';

@Injectable({
  providedIn: 'root'
})
export class LightningLevelService {

  private baseUrl =  'http://192.168.1.47:3001';
  constructor(private httpClient: HttpClient) { }

  getInitialLightLevel() {
    let data = this.httpClient.get<LightingLevel[]>(`${this.baseUrl}/data`);
    // console.log('getInitialLightLevel()', data);
    return data;
  }
}