import {Component, Input} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {IVaultResource} from "@harpokrat/client";

@Component({
  selector: 'app-password-add-form',
  templateUrl: './password-add-form.component.html',
  styleUrls: ['./password-add-form.component.scss']
})
export class PasswordAddFormComponent {

  @Input() vault: IVaultResource;

  constructor(private readonly eventService: EventService) {
  }

  onSubmit() {
    this.eventService.passwordsChanged.next();
  }
}
