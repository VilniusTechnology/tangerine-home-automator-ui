import { OnInit } from '@angular/core';
import {Component} from '@angular/core';

@Component({
  selector: 'app-lightomator',
  templateUrl: './lightomator.component.html',
  styleUrls: ['./lightomator.component.scss']
})
export class LightomatorComponent implements OnInit {

  public ledModesList = [
    {code: 0, title:"AUTO"},
    {code: 1, title:"MANUAL"},
    {code: 2, title:"TIMED"}
  ];

  public intervals = [
    {
      "id": 0,
        "title": "morning",
        "from" : "07:00",
        "to": "09:00",
        "settings": {
            'red' : 150,
            'green' : 0,
            'blue': 255,
        }
    },
    {
      "id": 1,
        "title": "noon",
        "from" : "09:01",
        "to": "12:30",
        "settings": {
            'red' : 150,
            'green' : 1,
            'blue': 50,
        }
    },
    {
      "id": 2,
        "title": "afternoon",
        "from" : "12:31",
        "to": "18:00",
        "settings": {
            'red' : 100,
            'green' : 1,
            'blue': 0,
        }
    },
    {
      "id": 3,
        "title": "evening",
        "from" : "18:01",
        "to": "22:00",
        "settings": {
            'red' : 100,
            'green' : 1,
            'blue': 0,
        }
    }
];

public freshInterval = {
  "title": "",
  "from" : "01:00",
  "to": "23:59",
  "settings": {
      'red' : 0,
      'green' : 0,
      'blue': 0,
  }
};

  constructor() { }

  ngOnInit() {
    console.log(this);
  }
  
  handleModeChange(event) {
    console.log(event);
  }

  handleClick(event, ddd) {
    event.preventDefault();

    for (var item of ddd.children) {
      try {
        console.log(item.children[0].children[0].children[0].children[0].value);
        console.log(item.children[0].children[0].children[0].children[0].id);
      } catch (e) {
        // console.log(e);
      }
      
  }
  }

}
