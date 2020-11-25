import {Component, Input, OnInit} from '@angular/core';
import {SecretService} from '../../../services/secret.service';
import {IResource, IPassword} from '@harpokrat/client';
import {EventService} from "../../../../../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'hpk-secret-delete-form',
  templateUrl: './secret-delete-form.component.html',
  styleUrls: ['./secret-delete-form.component.css']
})
export class SecretDeleteFormComponent implements OnInit {

  @Input() secret: IResource<IPassword>;

  constructor(
    readonly secretService: SecretService,
    private readonly eventService: EventService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async onDelete(){
    this.eventService.passwordsChanged.next();
    await this.router.navigate(['/app/passwords']);
  }

}
