import { Component, OnInit } from '@angular/core';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-headed',
  templateUrl: './headed.component.html',
  styleUrls: ['./headed.component.scss']
})
export class HeadedComponent implements OnInit {

    constructor(private endpointsHealthService: EndpointsHealthService) 
    { }

    ngOnInit() {
        this.endpointsHealthService.periodicallyCheckAllEndpointsHealth(environment.endpoints.healthCheckPeriod);
    }

}
