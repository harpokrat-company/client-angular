import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../harpokrat/src/lib/services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  itemsList = [
    {
      name: 'Home',
      route: '/app/',
      icon: 'home',
      exact: true,
    },
    {
      name: 'My Passwords',
      route: '/app/passwords',
      icon: 'lock',
      exact: false,
    },
    {
      name: 'Organisations',
      route: '/app/organisations',
      icon: 'groups',
      exact: false,
    },
    {
      name: 'Logs',
      route: '/app/logs',
      icon: 'event_note',
      exact: false,
    }
  ];

  constructor(
    private readonly $authService: AuthService,
    private readonly $router: Router
  ) {
  }

  logout() {
    this.$authService.token = null;
    this.$router.navigate(['/login']).then();
  }

}
