import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';
import {IResourceIdentifier, IToken} from '@harpokrat/client';
import {filter, switchMap, take, tap} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {SecretService} from "../../../services/secret.service";
import {UserSecretService} from "../../../services/user-secret.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'hpk-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  error: string;

  loginForm: FormGroup;

  loading: boolean;

  @Output() readonly login: EventEmitter<IToken>;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $tokenService: TokenService,
    private readonly $authService: AuthService,
    private readonly $apiService: ApiService,
    private readonly $userSecretService: UserSecretService,
    private readonly $secretService: SecretService,
    private readonly $userService: UserService,
  ) {
    this.login = new EventEmitter<IToken>();
  }

  ngOnInit() {
    this.loginForm = this.$formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loading = false;
    this.error = null;
  }

  onLogin() {
    this.loading = true;
    this.error = null;
    const {email, password} = this.loginForm.controls;
    this.$tokenService.login(email.value, password.value).subscribe(
      async (resource) => {
        this.loading = false;
        this.login.emit(resource.attributes);
        this.$authService.key = password.value;
        const hcl = await this.$apiService.hclModulePromise;
        const keyPair = hcl.GenerateRSAKeyPair(512);
        const other = hcl.GenerateRSAKeyPair(512);
        console.log(keyPair);
        const publicKey = keyPair.GetPublic();
        const privateKey = keyPair.GetPrivate();
        console.log(publicKey);
        const privateOther = other.GetPrivate();
        privateOther.InitializeAsymmetricCipher();
        const test = privateOther.SerializeAsymmetric(keyPair.GetPublic().ExtractKey());
        console.log('TEST', test);
        publicKey.InitializePlainCipher();
        privateKey.InitializeSymmetricCipher();
        publicKey.SetOwner(resource.id);
        privateKey.SetOwner(resource.id);
        const serialized = publicKey.Serialize('');
        console.log('CREATE PUBLIC KEY SERIALIZED = ', serialized);
        console.log('CREATE PUBLIC KEY SERIALIZED = ', serialized);
        const owner = resource.relationships['user'].data;
        this.$authService.tokenObservable.pipe(
          filter((t) => t != null),
          tap((t) => console.log('T', t)),
          take(1),
          switchMap(() => this.$userSecretService.privateKey),
          tap((pk) => console.log('PK:', pk)),
          filter((pk) => pk == null),
          tap((pk) => console.log('CREATING PK:', pk)),
          switchMap(() => combineLatest([
            this.$secretService.create({
              content: serialized,
              private: false,
            }, {
              owner: {data: owner as IResourceIdentifier},
            }),
            this.$secretService.create({
              content: privateKey.Serialize(password.value),
              private: true,
            }, {
              owner: {data: owner as IResourceIdentifier},
            }),
          ]))
        ).subscribe(([, pk]) => {
          const userId = this.$authService.currentUser.id;
          this.$userService.update(userId, {
            id: userId,
            type: 'users',
            relationships: {
              'encryption-key': {
                data: {
                  id: pk.id,
                  type: 'secrets',
                },
              }
            },
          }).subscribe();
        });
      }, (err) => {
        this.error = 'Invalid email/password';
        this.loading = false;
      },
    );
  }

}
