import {Component, Input, OnInit} from '@angular/core';
import {ILog, ILogResource} from "@harpokrat/client";

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss']
})
export class LogCardComponent implements OnInit {

  @Input() log: ILogResource;

  constructor() {
  }

  ngOnInit(): void {
  }

  get date(): string {
    return new Date(this.log.attributes['date'] * 1000).toISOString().substring(0, 19).replace(/T/, ' ');
  }

  get uri(): string {
    return decodeURI(this.log.attributes['uri']);
  }
}
