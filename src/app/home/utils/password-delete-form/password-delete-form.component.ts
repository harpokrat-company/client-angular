import {Component, EventEmitter, Input,  Output} from '@angular/core';
import {TempService} from '../../../../services/temp.service';

@Component({
  selector: 'app-password-delete-form',
  templateUrl: './password-delete-form.component.html',
  styleUrls: ['./password-delete-form.component.scss']
})
export class PasswordDeleteFormComponent {
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
    this.tempService.delPassword(this.password.id).subscribe(
      password => this.onSuccess(password),
      error => { /* TODO */ },
    );
  }

}
