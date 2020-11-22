import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SecretService} from "../../../../harpokrat/src/lib/services/secret.service";
import {TempService} from "../../../../services/temp.service";
import {IVaultResource} from "@harpokrat/client";

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

  @Input() vault: IVaultResource;

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
