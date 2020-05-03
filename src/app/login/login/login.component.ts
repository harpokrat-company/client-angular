import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '@harpokrat/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/app').then();
  }
}
