import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";
import * as FileSaver from 'file-saver';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {

    private subscription: Subscription;
    private dataMqtt;

    constructor(
      private fileService: FileService,
      private _mqttService: MqttService
    ) {
      this.dataMqtt = [];
    }

    ngOnInit() {
    }

  downloadCert(path, name) {
    this.fileService.downloadFile(path, name).subscribe(response => {
      let blob:any = new Blob(
        [response],
        { type: 'text/json; charset=utf-8' }
      );
      FileSaver.saveAs(blob, name);
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  goToLink(link) {
    window.open(link, "_blank");
  }

}
