import { Component, OnInit } from '@angular/core';

import { LedEmulatorEvent } from './models/led-emulator-event';
import { Action } from './models/action';
import { User } from './models/user';
import { Message } from './models/message';
import { SocketService } from './shared/services/socket.service';

@Component({
  selector: 'app-led-emulator',
  templateUrl: './led-emulator.component.html',
  styleUrls: ['./led-emulator.component.scss']
})
export class LedEmulatorComponent implements OnInit {
  
    action = Action;
    user: User;
    messages: Message[] = [];
    messageContent: string;
    ioConnection: any;
    ledColor: string = 'green';
  
    constructor(private socketService: SocketService) { }
  
    
    ngOnInit(): void {
      this.initIoConnection();
    }
  
    private initIoConnection(): void {
      this.socketService.initSocket();
  
      this.ioConnection = this.socketService.onMessage()
        .subscribe((message: Message) => {
          this.messages.push(message);
          console.log('this.socketService.onMessage()', message.color);
          this.ledColor = `rgb(${message.color.red}, ${message.color.green}, ${message.color.blue})`;
        });
  
      this.socketService.onEvent(LedEmulatorEvent.CONNECT)
        .subscribe(() => {
          console.log('connected');
        });
        
      this.socketService.onEvent(LedEmulatorEvent.DISCONNECT)
        .subscribe(() => {
          console.log('disconnected');
        });
    }
  
    public sendMessage(message: string): void {
      if (!message) {
        return;
      }
  
      this.socketService.send({
        from: 'fefefer',
        content: message,
        color: 'none'
      });
      this.messageContent = null;
    }
  
    public sendNotification(params: any, action: Action): void {
      let message: Message;
  
      if (action === Action.JOINED) {
        message = {
            from: 'fefefer',
            content: 'JOINED',
            color: 'none'
        }
      } else if (action === Action.RENAME) {
        message = {
            from: 'fefefer',
            content: 'RENAME',
            color: 'none'
        };
      }
  
      this.socketService.send(message);
  }

}
