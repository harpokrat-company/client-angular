import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IVaultResource} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {VaultService} from "../../../../../../harpokrat/src/lib/services/vault.service";

@Component({
  selector: 'app-vault-delete',
  templateUrl: './vault-delete.component.html',
  styleUrls: ['./vault-delete.component.scss']
})
export class VaultDeleteComponent implements OnInit {

  vaultObservable: Observable<IVaultResource>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly vaultService: VaultService
  ) {
  }

  ngOnInit(): void {
    this.vaultObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.vaultService.read(p['vaultId']))
    );
  }
}
