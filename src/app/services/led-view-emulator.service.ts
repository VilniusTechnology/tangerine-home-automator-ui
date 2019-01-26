import { Injectable } from '@angular/core';
import { SocketClient } from 'mandarin-nest-local-light-driver/dist/client';
import { RgbCalculatorService } from './rgb-calculator.service';
import { Subject, Observable } from 'rxjs';
import { EndpointsService } from './endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class LedEmulatorViewService {
    public socketClient: SocketClient;
    public currentColors: {} = {};

    private chipColorsSubject = new Subject<any>();

    constructor(
        private rgbService: RgbCalculatorService,
        private endpointsService: EndpointsService    
    ) {
        this.socketClient = new SocketClient();
        this.socketClient.initSocket(this.endpointsService.getEndpointUrlByKey('ledController'));
        this.socketClient.onMessage().subscribe((message: any) => {
            this.currentColors = this.rgbService.determineCurrentColor(message.color);
            this.chipColorsSubject.next(this.currentColors);
        });
    }

    public subscribeOnColorsSubject(): Observable<any> {
        return this.chipColorsSubject.asObservable();
    }
}
