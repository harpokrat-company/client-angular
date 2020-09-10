import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface IDropdownMenuOption {

  title: string;

  icon?: string;

  class?: string;

  routerLink: string;

  queryParams?: object;
}


@Component({
  selector: 'app-menu-more-dropdown',
  templateUrl: './menu-more-dropdown.component.html',
  styleUrls: ['./menu-more-dropdown.component.scss']
})
export class MenuMoreDropdownComponent implements OnInit {

  @Input() options: IDropdownMenuOption[];

  private _open: boolean;

  @Input() set open(value: boolean) {
    this._open = value;
    this.openChange.emit(value);
  }

  get open(): boolean {
    return this._open;
  }

  @Output() openChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
