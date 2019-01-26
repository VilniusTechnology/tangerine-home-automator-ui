import { Component, OnInit } from '@angular/core';
import { Action } from './models/action';
import { User } from './models/user';
import { Message } from './models/message';
import { SocketClient } from 'mandarin-nest-local-light-driver/dist/client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-led-emulator',
  templateUrl: './led-emulator.component.html',
  styleUrls: ['./led-emulator.component.scss']
})
export class LedEmulatorComponent implements OnInit {
  
    sc;
    action = Action;
    user: User;
    messages: Message[] = [];
    messageContent: string;
    ioConnection: any;
    ledColor: string = 'black';
  
    constructor() { }
    
    ngOnInit(): void {
        this.sc = new SocketClient();
        this.sc.initSocket(environment.ledEmulatorAdress);
        this.sc.onMessage().subscribe((message) => {
            this.ledColor = `rgb(${message.color.red.value}, ${message.color.green.value}, ${message.color.blue.value})`;
            console.log(this.ledColor);
        })
    }

    openNewWindow() {
        window.open('/led-outlet', '', 'width=350,height=280');
    }

}
