import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-light-outlet',
  templateUrl: './light-outlet.component.html',
  styleUrls: ['./light-outlet.component.scss']
})
export class LightOutletComponent implements OnInit {

    title = "Detached LED emulator";

    constructor(private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}
