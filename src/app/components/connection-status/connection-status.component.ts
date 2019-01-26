import { Component, OnInit, Input } from '@angular/core';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';

@Component({
    selector: 'app-connection-status',
    templateUrl: './connection-status.component.html',
    styleUrls: ['./connection-status.component.scss']
})
export class ConnectionStatusComponent implements OnInit {

    public static readonly always = 'always';
    public static readonly onOK   = 'ok';
    public static readonly onFail = 'fail';

    @Input('showOn') showOn: string = 'always';
    @Input('messsageOk') messsageOk: string;
    @Input('messsageFail') messsageFail: string;
    @Input('endpointConfigKey') endpointConfigKey: string;

    public displayBox: boolean;
    public message: string = '';

    constructor(
        private endpointsHealthService: EndpointsHealthService
    ) {}

    public ngOnInit() {
        this.resolveComponentsView();

        this.endpointsHealthService.subscribeOnEndpointsHealthState()
            .subscribe( (data) => {
                this.resolveComponentsView();
            });
    }

    public resolveClass() {
        if (this.checkStatus()) {
            return 'ok';
        }

        return 'fail';
    }

    private resolveComponentsView() {
        const data = this.getExpectedMessage();
        this.displayBox = data.status;
        this.message = data.message;
    }

    private checkStatus() {
        return this.endpointsHealthService.getEndpointHealthStatus(this.endpointConfigKey);
    }

    private formMessageText() {
        if (this.checkStatus()) {
            return this.messsageOk;
        }

        return this.messsageFail; 
    }

    private getExpectedMessage() {
        if (this.showOn == ConnectionStatusComponent.always) {
            return {'status': true, 'message': this.formMessageText()};
        }

        if (this.showOn == ConnectionStatusComponent.onOK && this.checkStatus()) {
            return {'status': true, 'message': this.formMessageText()};
        }

        if (this.showOn == ConnectionStatusComponent.onFail && this.checkStatus()) {
            return {'status': true, 'message': this.formMessageText()};
        }

        return {'status': false, 'message': this.formMessageText()};
    }
}
