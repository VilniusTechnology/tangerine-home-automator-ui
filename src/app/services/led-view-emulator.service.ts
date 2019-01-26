import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { SocketClient } from 'mandarin-nest-local-light-driver/dist/client';
import { RgbCalculatorService } from './rgb-calculator.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedEmulatorViewService {
    public socketClient: SocketClient;
    public currentColors: {} = {};

    private chipColorsSubject = new Subject<any>();

    constructor(private rgbService: RgbCalculatorService) {
        this.socketClient = new SocketClient();
        this.socketClient.initSocket(environment.endpoints.emulatorEndpoints.ledControllerAddress);
        this.socketClient.onMessage().subscribe((message: any) => {
            this.currentColors = this.rgbService.determineCurrentColor(message.color);
            this.chipColorsSubject.next(this.currentColors);
        });
    }

    public subscribeOnColorsSubject(): Observable<any> {
        return this.chipColorsSubject.asObservable();
    }
}
