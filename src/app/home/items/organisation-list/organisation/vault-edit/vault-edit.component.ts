import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IOrganizationResource, IResourceIdentifier, IVaultResource} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../../../../services/event.service";
import {map, switchMap} from "rxjs/operators";
import {GroupService} from "../../../../../../harpokrat/src/lib/services/group.service";
import {VaultService} from "../../../../../../harpokrat/src/lib/services/vault.service";

@Component({
  selector: 'app-vault-edit',
  templateUrl: './vault-edit.component.html',
  styleUrls: ['./vault-edit.component.scss']
})
export class VaultEditComponent implements OnInit {

  groupObservable: Observable<IResourceIdentifier>;

  vaultObservable: Observable<IVaultResource>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly groupService: GroupService,
    private readonly eventService: EventService,
    readonly vaultService: VaultService,
  ) {
  }

  ngOnInit(): void {
    this.groupObservable = this.activatedRoute.parent.parent.params.pipe(
      map((p) => ({type: 'groups', id: p['groupId']}))
    );
    this.vaultObservable = this.eventService.vaultsChanged.pipe(
      switchMap(() => this.activatedRoute.parent.params),
      switchMap((p) => this.vaultService.read(p['vaultId']))
    );
  }

  onCreate() {
    this.eventService.vaultsChanged.next();
  }
}
