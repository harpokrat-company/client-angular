import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '@harpokrat/api';
import {LoginForm} from '../../../model/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  login(login: LoginForm) {
    this.tokenService.login(login.email, login.password).subscribe(
      success => this.router.navigateByUrl('').then(),
      error => {/* TODO */}
    );
  }
}
