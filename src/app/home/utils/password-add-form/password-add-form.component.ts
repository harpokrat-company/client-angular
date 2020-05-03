import {Component, EventEmitter, Output} from '@angular/core';
import {TempService} from '../../../../services/temp.service';
import {SecretService} from '@harpokrat/api';

@Component({
  selector: 'app-password-add-form',
  templateUrl: './password-add-form.component.html',
  styleUrls: ['./password-add-form.component.scss']
})
export class PasswordAddFormComponent {
  password = {};

  @Output() success: EventEmitter<number> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();
  @Output() submited: EventEmitter<boolean> = new EventEmitter();

  constructor(private tempService: TempService,
              private passwordService: SecretService) {
  }

  public onCancel() {
    this.canceled.emit(true);
    this.submited.emit(true);
  }

  public onSuccess(password) {
    this.success.emit(password);
    this.submited.emit(true);
  }

  public save(event: any) {
    this.tempService.addPassword(event).subscribe(
      password => this.onSuccess(password),
      error => { /* TODO */
      },
    );
    this.password = {};
  }
}
