import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TempPassword} from '../../../../services/temp-password';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Input() password: TempPassword;

  @Output() passwordChange: EventEmitter<TempPassword> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();

  passwordForm;

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (!this.passwordForm.valid) {
      return;
    }
    /* TODO : use password model */
    this.password.name = this.passwordForm.controls.name.value;
    this.password.domain = this.passwordForm.controls.domain.value;
    this.password.icon = this.passwordForm.controls.icon.value;
    this.password.secret = this.passwordForm.controls.secret.value;
    this.passwordChange.emit(this.password);
  }

  onCancel() {
    this.canceled.emit(true);
  }

  createForm() {
    console.log(this.password);
    if (this.password) {
      this.passwordForm = this.fb.group({
        name: [this.password.name, Validators.required],
        domain: [this.password.domain],
        icon: [this.password.icon],
        secret: [this.password.secret, Validators.required]
      });
    } else {
      this.passwordForm = this.fb.group({
        name: ['', Validators.required],
        domain: [''],
        icon: [''],
        secret: ['', Validators.required]
      });
    }
  }
}
