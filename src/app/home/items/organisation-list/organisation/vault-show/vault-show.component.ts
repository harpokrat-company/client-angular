import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ISecretResource, IVaultResource} from "@harpokrat/client";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {VaultService} from "@harpokrat/api";

@Component({
  selector: 'app-vault-show',
  templateUrl: './vault-show.component.html',
  styleUrls: ['./vault-show.component.scss']
})
export class VaultShowComponent implements OnInit {

  vaultObservable: Observable<IVaultResource>;

  secretObservable: Observable<ISecretResource[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly vaultService: VaultService) {
  }

  ngOnInit(): void {
    this.vaultObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.vaultService.read(p['vaultId']))
    );
    this.secretObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.vaultService.endpoint.resource(p['vaultId'], 'secrets').readMany())
    );
  }

}
