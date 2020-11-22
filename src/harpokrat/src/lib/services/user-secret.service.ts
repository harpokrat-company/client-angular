import {Injectable} from '@angular/core';
import {
  IHclSecret,
  IPrivateKey, IPublicKey,
  IResource,
  IResourceIdentifier,
  ISecretResource,
  ISymmetricKey
} from "@harpokrat/client";
import {AuthService} from "./auth.service";
import {combineLatest, defer, Observable} from "rxjs";
import {SecretService} from "./secret.service";
import {filter, map, shareReplay, switchMap, take, tap} from "rxjs/operators";
import {ApiService} from "./api.service";
import {UserService} from "./user.service";
import {VaultService} from "./vault.service";

export interface IWrappedSecret<T extends IHclSecret = IHclSecret> {
  private: boolean;
  attributes: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserSecretService {

  all: Observable<IWrappedSecret[]>;

  publicKey: Observable<IPublicKey>;

  publicKeyNotNull: Observable<IPublicKey>;

  privateKey: Observable<IPrivateKey>;

  privateKeyNotNull: Observable<IPrivateKey>;

  constructor(
    private readonly $authService: AuthService,
    private readonly $userService: UserService,
    private readonly $secretService: SecretService,
    private readonly $apiService: ApiService,
    private readonly $vaultService: VaultService,
  ) {
    this.privateKey = this.$authService.tokenObservable.pipe(
      filter((t) => t != null),
      map(() => this.$authService.currentUser as IResourceIdentifier),
      switchMap((userResourceIdentifier) =>
        defer(() => this.$userService.endpoint.resource(userResourceIdentifier.id, 'encryption-key').readMany({
          page: 1,
          size: 1,
        })).pipe(
          switchMap<[ISecretResource], Promise<IPrivateKey>>(async (key) => {
            if (key == null) {
              return null;
            }
            const hcl = await this.$apiService.hclModulePromise;
            const userKey = await this.$authService.symKeySubject.pipe(
              filter((k) => k != null),
              tap((k) => console.log('K NOT NULL:', k)),
              take(1),
            ).toPromise();
            const deserialized = hcl.Secret.Deserialize(userKey.GetKey(), (key as any).attributes.content);
            return hcl.CastSecretToPrivateKey(deserialized);
          }),
          shareReplay(1)
        ),
      ));
    this.privateKeyNotNull = this.privateKey.pipe(
      filter((k) => k != null),
    );
    this.all = this.$authService.tokenObservable.pipe(
      filter((t) => t != null),
      map(() => this.$authService.currentUser as IResourceIdentifier),
      switchMap((userResourceIdentifier) => combineLatest([
        defer(() => this.$userService.endpoint.resource(userResourceIdentifier.id, 'secrets').readMany({
          page: 1,
          size: 42069,
        })),
        this.privateKey.pipe(
          filter((pk) => pk !== null),
        )
      ])),
      switchMap(([secretArray, masterKey]) =>
        defer(() => this.$apiService.hclModulePromise).pipe(
          map((hcl) => secretArray.map((secret) => {
              let attributes: IHclSecret;
              if (secret.attributes.private) {
                try {
                  attributes = hcl.Secret.DeserializeAsymmetric(masterKey.ExtractKey(), secret.attributes.content);
                } catch (e) {
                  console.log(hcl.GetExceptionMessage(e));
                  return null;
                }
              } else {
                console.log('READ PUBLIC KEY SERIALIZED = ', secret.attributes.content);
                attributes = hcl.Secret.Deserialize('', secret.attributes.content);
              }
              return {
                attributes,
                private: secret.attributes.private,
              };
            }).filter((v) => v != null),
          ),
        ),
      ),
    );
    this.publicKey = this.all.pipe(
      switchMap(async (secretResourceArray) => {
        const hcl = await this.$apiService.hclModulePromise;
        const found = await secretResourceArray.find((secret) => secret.private === false);
        console.log('PUBLIC, ', found.attributes.CorrectDecryption(), found.attributes.GetSecretTypeName());
        return hcl.CastSecretToPublicKey(found.attributes);
      }),
      shareReplay(1),
    );
    this.publicKeyNotNull = this.publicKey.pipe(
      filter((k) => k != null),
    );
  }

  ofType<T extends IHclSecret = IHclSecret>(type: string): Observable<IWrappedSecret<T>[]> {
    return this.all.pipe(
      map((arr) => arr
        .filter((s) => s.attributes.GetSecretTypeName() === type)
        .map((s) => ({
            private: s.private,
            attributes: this.$apiService.hcl.cast<T>(s.attributes),
          })
        )
      )
    );
  }

  getGroupKey(groupId: string): Promise<IWrappedSecret<IPrivateKey>> {
    return this.ofType<IPrivateKey>('private-key').pipe(
      map((arr) => arr.find((s) => s.attributes.GetOwner() === groupId))
    ).toPromise();
  }

  async getVaultKey(vaultId: string): Promise<ISymmetricKey> {
    const vaultSecret: ISecretResource = await this.$vaultService.endpoint.resource(vaultId, 'encryption-key').readMany() as any;
    const owner: IResource = await this.$apiService.client.vaults.resource(vaultId, 'owner').readMany() as any;
    const hcl = await this.$apiService.hclModulePromise;
    let key: IPrivateKey;
    if (owner.type === 'users') {
      key = await this.privateKeyNotNull.toPromise();
    } else {
      key = await this.getGroupKey(owner.id).then((s) => s.attributes);
    }
    const ret = hcl.Secret.DeserializeAsymmetric(key.ExtractKey(), vaultSecret.attributes.content);
    console.log('VAULT KEY = ', ret.CorrectDecryption(), ret.GetSecretTypeName());
    return hcl.CastSecretToSymmetricKey(ret);
  }
}
