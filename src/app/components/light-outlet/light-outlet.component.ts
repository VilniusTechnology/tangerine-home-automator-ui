import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SocketClient } from 'mandarin-nest-local-light-driver/dist/client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-light-outlet',
  templateUrl: './light-outlet.component.html',
  styleUrls: ['./light-outlet.component.scss']
})
export class LightOutletComponent implements OnInit {

    title = "Detached LED emulator";
    sc;
    ledColor: string = 'green';

    constructor(private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);

        this.sc = new SocketClient();
        this.sc.initSocket(environment.ledEmulatorAdress);
        this.sc.onMessage().subscribe((message) => {
            this.ledColor = `rgb(${message.color.red.value}, ${message.color.green.value}, ${message.color.blue.value})`;
            console.log(this.ledColor);
        })
    }

}
