import { Component, OnInit } from '@angular/core';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';
import { environment } from 'src/environments/environment';
import { PwaService } from 'src/app/services/pwa.service';
import { SwUpdate } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UpdateDialogComponent} from "../../components/update-dialog/update-dialog.component";

@Component({
  selector: 'app-headed',
  templateUrl: './headed.component.html',
  styleUrls: ['./headed.component.scss']
})
export class HeadedComponent implements OnInit {

    constructor(
        private endpointsHealthService: EndpointsHealthService,
        private swUpdate: SwUpdate,
        public pwa: PwaService,
        private dialog: NgbModal
    ) { }

    ngOnInit() {
        if (this.swUpdate.isEnabled) {
          this.swUpdate.available.subscribe((i) => {
            const confirmModal = this.dialog.open(UpdateDialogComponent);
            confirmModal.componentInstance.modalObservable.subscribe((a) => {
              window.location.reload();
            });
          })
        }

        this.endpointsHealthService.periodicallyCheckAllEndpointsHealth(environment.endpoints.healthCheckPeriod);
    }

    installPwa(): void {
        this.pwa.promptEvent.prompt();
    }
}
