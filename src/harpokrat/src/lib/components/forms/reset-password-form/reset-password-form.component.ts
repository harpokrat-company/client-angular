import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecureActionService} from '../../../services/secure-action.service';
import {ISecureActionResource} from '@harpokrat/client';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'hpk-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  error: string;

  resetForm: FormGroup;

  loading: boolean;

  @Output() readonly reset = new EventEmitter<void>();

  @Input() token: string;

  @Input() secureAction: ISecureActionResource;

  constructor(
    private readonly $fb: FormBuilder,
    private readonly $secureActionService: SecureActionService,
    private readonly $apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.resetForm = this.$fb.group({
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const password = this.resetForm.controls.password.value;
    const key = this.$apiService.hcl.module.GetDerivedKey(password.value);
    this.$secureActionService.update(this.secureAction.id, {
      ...this.secureAction,
      attributes: {
        payload: key
      }
    }, {
      token: this.token,
    }).subscribe(
      () => {
        this.loading = false;
        this.reset.next();
      },
      () => {
        this.loading = false;
        this.error = 'An Error Occurred';
      }
    );
  }

}
