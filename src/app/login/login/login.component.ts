import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '@harpokrat/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private readonly $activateRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }

  login() {
    const route = this.$activateRoute.snapshot.queryParams['redirect'] || '/app';
    this.router.navigateByUrl(route).then();
  }
}
