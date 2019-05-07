import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuOpen = true;

  constructor() { }

  onMenuClick() {
    this.menuOpen = !this.menuOpen;
  }
}
