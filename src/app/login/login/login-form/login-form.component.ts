import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../../../../model/login-form';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Output() submit = new EventEmitter();

  loginForm: FormGroup;

  onSuccess(login: LoginForm) {
    this.submit.emit(login);
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.onSuccess(new LoginForm(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    ));
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
