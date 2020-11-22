import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IGroupResource, IVault, IVaultResource} from "@harpokrat/client";
import {AuthService} from "../../../services/auth.service";
import {VaultService} from "../../../services/vault.service";
import {Observable} from "rxjs";
import {SecretService} from "../../../services/secret.service";
import {ApiService} from "../../../services/api.service";
import {randomBytes} from "../../../../utils";
import {UserSecretService} from "../../../services/user-secret.service";

@Component({
  selector: 'hpk-vault-form',
  templateUrl: './vault-form.component.html',
  styleUrls: ['./vault-form.component.css']
})
export class VaultFormComponent implements OnInit {

  error: string;

  vaultForm: FormGroup;

  loading: boolean;

  @Input() vault: IVaultResource;

  @Input() group: IGroupResource;

  @Output() readonly create = new EventEmitter<IVaultResource>();

  @Output() readonly vaultChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $authService: AuthService,
    private readonly $vaultService: VaultService,
    private readonly $secretService: SecretService,
    private readonly $apiService: ApiService,
    private readonly $userSecretService: UserSecretService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<IVault> = this.vault && this.vault.attributes || {};
    this.vaultForm = this.$formBuilder.group({
      name: [attributes.name || '', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {name} = this.vaultForm.controls;
    let obs: Observable<any>;
    const attributes: IVault = {
      name: name.value,
    };
    if (this.vault) {
      const copy = {...this.vault};
      delete copy.relationships;
      obs = this.$vaultService.update(this.vault.id, {
        ...copy,
        attributes,
      });
    } else {
      obs = this.$vaultService.create(attributes, {
        owner: {data: this.group || this.$authService.currentUser}
      });
    }
    obs.subscribe(async (resource) => {
      this.loading = false;
      if (this.vault == null) {
        const hcl = await this.$apiService.hclModulePromise;
        const key = new hcl.SymmetricKey();
        key.InitializeSymmetricCipher();
        key.SetKey(randomBytes(64));
        const groupKey = await this.$userSecretService.getGroupKey(this.group.id);
        this.$secretService.create({
          content: groupKey.attributes.SerializeAsymmetric(key),
          private: true,
        }, {
          owner: {data: resource},
        });
      }
      this.create.emit(resource);
    }, () => {
      this.error = 'An error occurred';
      this.loading = false;
    });
  }
}
