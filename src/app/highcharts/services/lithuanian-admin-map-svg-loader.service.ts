import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LithuanianAdminMapSvgLoaderService {

  constructor(private http: HttpClient) {
    this.getMapJSON().subscribe(data => {
        // console.log(data)
    });
  }

  public getMapJSON(): Observable<any> {
      return this.http.get("/ltu-admin-map.json")
  }
}
