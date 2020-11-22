import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ISecretResource, IVaultResource} from "@harpokrat/client";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {VaultService} from "../../../../../../harpokrat/src/lib/services/vault.service";
import {ApiService} from "../../../../../../harpokrat/src/lib/services/api.service";
import {IWrappedPassword} from "../../../password-list/password-list.component";
import {EventService} from "../../../../../../services/event.service";

@Component({
  selector: 'app-vault-show',
  templateUrl: './vault-show.component.html',
  styleUrls: ['./vault-show.component.scss']
})
export class VaultShowComponent implements OnInit {

  encryptionKeyObservable: Observable<ISecretResource>;

  vaultObservable: Observable<IVaultResource>;

  secretObservable: Observable<IWrappedPassword[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly vaultService: VaultService,
    private readonly apiService: ApiService,
    private readonly eventService: EventService) {
  }

  ngOnInit(): void {
    this.vaultObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.vaultService.read(p['vaultId'])),
    );
    this.encryptionKeyObservable = this.vaultObservable.pipe(
      switchMap((v) => this.vaultService.endpoint.resource(v.id, 'encryption-key').readMany()),
      map((arr) => arr as any),
    )
    this.secretObservable = this.eventService.vaultSecretsChanged.pipe(
      switchMap(() => this.activatedRoute.parent.params),
      switchMap((p) => this.vaultService.endpoint.resource(p['vaultId'], 'secrets').readMany()),
      switchMap(async (secrets) => {
        const hcl = await this.apiService.hclModulePromise;
        return secrets.map((s) => ({
          secret: s,
          password: hcl.Secret.Deserialize('', s.attributes.content)
        } as IWrappedPassword));
      }),
    );
  }

  onCreate() {
    console.log('NEXT');
    this.eventService.vaultSecretsChanged.next(null);
  }

}
