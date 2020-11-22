import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../harpokrat/src/lib/services/auth.service";

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss']
})
export class LandingNavbarComponent implements OnInit {

  readonly authenticatedObservable: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.authenticatedObservable = authService.authenticatedObservable;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.token = null;
  }

}
