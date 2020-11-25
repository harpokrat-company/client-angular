import {Component, Input, OnInit} from '@angular/core';
import {IResource, IPassword, ISecret, ISecretResource, IVault} from '@harpokrat/client';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {ApiService} from "../../services/api.service";
import {switchMap} from "rxjs/operators";
import {EventService} from "../../../../../services/event.service";

enum SecretStatus {
  VIEW = 0,
  EDIT = 1,
  DELETE = 2,
}

@Component({
  selector: 'hpk-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  readonly secretResource: ReplaySubject<ISecretResource>;
  readonly password: Observable<IResource<IPassword>>;

  @Input() set secret(secret: ISecretResource) {
    this.secretResource.next(secret);
  }

  @Input() vault: IVault;

  status: SecretStatus;

  constructor(
    private readonly apiService: ApiService,
    private readonly eventService: EventService,
  ) {
    this.secretResource = new ReplaySubject<ISecretResource>();
    this.password = this.secretResource.pipe(
      switchMap(async (s) => {
        const hcl = await this.apiService.hclModulePromise;
        return {
          id: s.id,
          type: s.type,
          attributes: hcl.CastSecretToPassword(hcl.Secret.Deserialize('', s.attributes.content))
        };
      }),
    );
  }

  onChange() {
    this.eventService.passwordsChanged.next();
  }

  ngOnInit(): void {
    this.status = SecretStatus.VIEW;
  }

  view() {
    this.status = SecretStatus.VIEW;
  }

  edit() {
    this.status = SecretStatus.EDIT;
  }

  delete() {
    this.status = SecretStatus.DELETE;
  }
}
