import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  itemsList = [
    {
      name: 'Home',
      route: '',
      icon: 'home'
    },
    {
      name: 'My Passwords',
      route: 'passwords',
      icon: 'lock'
    }
  ];

}
