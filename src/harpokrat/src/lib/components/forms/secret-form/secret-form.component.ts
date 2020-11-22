import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecretService} from '../../../services/secret.service';
import {AuthService} from '../../../services/auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IResource, IPassword, IVault} from '@harpokrat/client';
import {ApiService} from "../../../services/api.service";
import {UserSecretService} from "../../../services/user-secret.service";

@Component({
  selector: 'hpk-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css']
})
export class SecretFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Input() vault: IResource<IVault>;

  @Input() secret: IResource<IPassword>;

  @Output() readonly create = new EventEmitter<IPassword>();

  @Output() readonly secretChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $apiService: ApiService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<IPassword> = this.secret && this.secret.attributes;
    this.secretForm = this.$formBuilder.group({
      name: [attributes && attributes.GetName() || '', Validators.required],
      login: [attributes && attributes.GetLogin() || '', Validators.required],
      password: [attributes && attributes.GetPassword() || '', Validators.required],
      domain: [attributes && attributes.GetDomain() || '', Validators.required],
    });
  }

  async onCreate() {
    this.loading = true;
    const {name, password, login, domain} = this.secretForm.controls;
    const hcl = await this.$apiService.hcl.getModule();
    const s = new hcl.Password();
    s.InitializePlainCipher();
    s.SetName(name.value);
    s.SetLogin(login.value);
    s.SetPassword(password.value);
    s.SetDomain(domain.value);
    //const pk = await this.$userSecretService.getVaultKey(this.vault.id);
    const serialized = s.Serialize('');
    let obs: Observable<any>;
    if (this.secret) {
      obs = this.$secretService.update(this.secret.id, {
        ...this.secret,
        attributes: {
          content: serialized,
        },
        relationships: undefined,
      });
    } else {
      obs = this.$secretService.create({
        content: serialized,
        private: true,
      }, {owner: {data: this.vault}});
    }
    obs.pipe(
      map((resource) => hcl.Secret.Deserialize('', resource.attributes.content)),
    ).subscribe(
      (resource) => {
        console.log('CREATE OK');
        this.loading = false;
        this.create.emit(hcl.CastSecretToPassword(resource));
      },
      () => {
        this.error = 'An error occurred';
        this.loading = false;
      },
    );
  }

}
