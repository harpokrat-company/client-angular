import {Component, OnInit} from '@angular/core';
import {defer, Observable, of} from "rxjs";
import {IPassword, ISecretResource, IVaultResource} from "@harpokrat/client";
import {SecretService} from "../../../../harpokrat/src/lib/services/secret.service";
import {UserService} from "../../../../harpokrat/src/lib/services/user.service";
import {AuthService} from "../../../../harpokrat/src/lib/services/auth.service";
import {map, shareReplay, switchMap} from "rxjs/operators";
import {VaultService} from "../../../../harpokrat/src/lib/services/vault.service";
import {ApiService} from "../../../../harpokrat/src/lib/services/api.service";
import {EventService} from "../../../../services/event.service";

export interface IWrappedPassword {
  secret: ISecretResource;

  password: IPassword;
}

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {

  constructor(
    private readonly secretService: SecretService,
    private readonly userService: UserService,
    private readonly vaultService: VaultService,
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
    private readonly eventsService: EventService,
  ) {
  }

  public secrets: Observable<IWrappedPassword[]>;

  public getPasswords() {
    this.secrets = this.eventsService.passwordsChanged.pipe(
      switchMap(() => defer(() => this.userService.endpoint.resource(this.authService.currentUser.id, 'vaults').readMany({
        size: 1,
        page: 1,
      }))),
      map(([v]) => v),
      switchMap((v) => {
        if (v) {
          return of(v);
        } else {
          return this.vaultService.create({
            name: '$master',
          } as any, {
            'owner': {data: this.authService.currentUser},
          })
        }
      }),
      switchMap((v: IVaultResource) => defer(() => this.apiService.client.vaults.resource(v.id, "secrets").readMany())),
      switchMap(async (secrets) => {
        const hcl = await this.apiService.hclModulePromise;
        return secrets.map((s) => ({
          secret: s,
          password: hcl.Secret.Deserialize('', s.attributes.content)
        } as IWrappedPassword));
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );
    this.secrets.subscribe((s) => console.log(s))
  }

  ngOnInit() {
    this.getPasswords();
  }
}
