import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@harpokrat/api';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Output() submit = new EventEmitter();

  registerForm: FormGroup;

  onSuccess(user: User) {
    this.submit.emit(user);
  }

  onSubmit() {
    if (!this.registerForm.valid || this.registerForm.controls.password.value !== this.registerForm.controls.passwordConfirmation.value) {
      return;
    }
    const user = new User();
    user.email = this.registerForm.controls.email.value;
    user.password = this.registerForm.controls.password.value;
    user.firstName = this.registerForm.controls.firstName.value;
    user.lastName = this.registerForm.controls.lastName.value;
    this.onSuccess(user);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

}
