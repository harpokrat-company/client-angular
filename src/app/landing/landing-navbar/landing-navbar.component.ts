import {Component, OnInit} from '@angular/core';
import {AuthService} from "@harpokrat/api";
import {Observable} from "rxjs";

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
