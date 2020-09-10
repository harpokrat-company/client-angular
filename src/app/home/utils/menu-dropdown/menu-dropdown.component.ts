import {Component, Input, OnInit} from '@angular/core';
import {IDropdownMenuOption} from "../menu-more-dropdown/menu-more-dropdown.component";

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent implements OnInit {

  @Input() icon: string;

  @Input() iconOpen: string = 'keyboard_arrow_up';

  @Input() iconClose: string = 'keyboard_arrow_down';

  @Input() title: string;

  private _open: boolean;

  get open(): boolean {
    return this._open;
  }

  @Input() set open(value: boolean) {
    this._open = value;
  }

  @Input() options: IDropdownMenuOption[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
