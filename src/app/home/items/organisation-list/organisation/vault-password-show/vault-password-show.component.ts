import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {share, switchMap} from "rxjs/operators";
import {SecretService} from "../../../../../../harpokrat/src/lib/services/secret.service";
import {ApiService} from "../../../../../../harpokrat/src/lib/services/api.service";
import {IPassword, IResource, IVaultResource} from "@harpokrat/client";
import {VaultService} from "../../../../../../harpokrat/src/lib/services/vault.service";

@Component({
  selector: 'app-vault-password-show',
  templateUrl: './vault-password-show.component.html',
  styleUrls: ['./vault-password-show.component.scss']
})
export class VaultPasswordShowComponent implements OnInit {


  vaultObservable: Observable<IVaultResource>;

  secretObservable: Observable<IResource<IPassword>>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    readonly secretService: SecretService,
    private readonly vaultService: VaultService,
    private readonly apiService: ApiService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.vaultObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.vaultService.read(p['vaultId'])),
      share(),
    );
    this.secretObservable = this.activatedRoute.params.pipe(
      switchMap((p) => this.secretService.read(p['secretId'])),
      switchMap(async (s) => {
        const hcl = await this.apiService.hclModulePromise;
        return {
          ...s,
          attributes: hcl.CastSecretToPassword(hcl.Secret.Deserialize('', s.attributes.content)),
        };
      })
    )
  }

  async onChange() {
    await this.router.navigate(['../..'], {
      relativeTo: this.activatedRoute,
    });
  }

}
