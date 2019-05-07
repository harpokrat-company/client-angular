import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../../../../model/login-form';

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.scss']
})
export class ForgetPasswordFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Output() submit = new EventEmitter();

  forgetForm: FormGroup;

  onSuccess(email: string) {
    this.submit.emit(email);
  }

  onSubmit() {
    if (!this.forgetForm.valid) {
      return;
    }
    this.onSuccess(this.forgetForm.controls.email.value);
  }

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
