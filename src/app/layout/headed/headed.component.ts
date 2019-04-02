import { Component, OnInit } from '@angular/core';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';
import { environment } from 'src/environments/environment';
import { PwaService } from 'src/app/services/pwa.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-headed',
  templateUrl: './headed.component.html',
  styleUrls: ['./headed.component.scss']
})
export class HeadedComponent implements OnInit {

    constructor(
        private endpointsHealthService: EndpointsHealthService,
        private swUpdate: SwUpdate,
        public pwa: PwaService
    ) { }

    ngOnInit() {
        if (this.swUpdate.isEnabled) {
            console.log('MUST DELETE: this.swUpdate.isEnabled');
            this.swUpdate.available.subscribe(() => {
                if (confirm('Update ?')) {
                    window.location.reload();
                }
            })
        }

        this.endpointsHealthService.periodicallyCheckAllEndpointsHealth(environment.endpoints.healthCheckPeriod);
    }

    installPwa(): void {
        this.pwa.promptEvent.prompt();
    }

}
