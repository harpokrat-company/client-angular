import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TempService} from '../../../../services/temp.service';

@Component({
  selector: 'app-password-edit-form',
  templateUrl: './password-edit-form.component.html',
  styleUrls: ['./password-edit-form.component.scss']
})
export class PasswordEditFormComponent {
  @Input() password;

  @Output() success: EventEmitter<number> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();

  constructor(private tempService: TempService) { }

  public onCancel() {
    this.canceled.emit(true);
    this.submitted.emit(true);
  }

  public onSuccess(password) {
    this.success.emit(password);
    this.submitted.emit(true);
  }

  public save(event: any) {
    this.tempService.updatePassword(this.password.id, event).subscribe(
      password => this.onSuccess(password),
      error => { /* TODO */ },
    );
  }
}
