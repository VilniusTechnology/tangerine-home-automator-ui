import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  entries$: Object;

  constructor() { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.entries$ = data
    );
  }

}
