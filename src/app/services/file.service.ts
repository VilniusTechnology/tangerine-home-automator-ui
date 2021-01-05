import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}

  downloadFile(path, name): any {
    const full = location.protocol
      + '//'
      + location.hostname
      + (location.port ? ':' + location.port: '');

    return this.http.get(
      full + '/assets/certs/' + path + '/' + name,
      {responseType: 'blob'}
      );
  }

}
