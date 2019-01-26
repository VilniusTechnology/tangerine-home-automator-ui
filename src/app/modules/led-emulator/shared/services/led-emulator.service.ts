import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';
import { LedEmulatorEvent } from '../../models/led-emulator-event';
import { Message } from '../../models/message';

import { environment } from 'src/environments/environment';

@Injectable()
export class LedEmulatorService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(environment.endpoints.emulatorEndpoints.ledControllerAddress);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => {
                observer.next(data);
            });
        });
    }

    public onEvent(event: LedEmulatorEvent): Observable<any> {
        return new Observable<LedEmulatorEvent>(observer => {
            this.socket.on(event, () => {
                console.log('onEvent', event);
                observer.next()
            });
        });
    }
}