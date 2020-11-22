import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IResourceIdentifier, ISymmetricKey, ITokenResource} from '@harpokrat/client';
import {ApiService} from "./api.service";

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_KEY = 'key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  symKeySubject: BehaviorSubject<ISymmetricKey>;

  get symKey(): ISymmetricKey {
    return this.symKeySubject.value;
  }

  private readonly $tokenSubject: BehaviorSubject<ITokenResource>;

  get tokenObservable(): Observable<ITokenResource> {
    return this.$tokenSubject.asObservable();
  }

  get authenticatedObservable(): Observable<boolean> {
    return this.tokenObservable.pipe(
      map(value => value != null),
    );
  }

  get currentUser(): IResourceIdentifier {
    return this.token.relationships.user.data as IResourceIdentifier;
  }

  get token(): ITokenResource {
    return this.$tokenSubject.value;
  }

  set token(value: ITokenResource) {
    this.$tokenSubject.next(value);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(value));
  }

  get key(): string {
    return this.symKey && this.symKey.GetKey();
  }

  set key(val: string) {
    this.apiService.hcl.getModule().then((m) => new m.SymmetricKey()).then((k) => {
      k.SetKey(val);
      console.log('Created symkey of type: ' + k.GetSecretTypeName(), k);
      this.symKeySubject.next(k);
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, val);
  }

  constructor(
    private readonly apiService: ApiService,
  ) {
    this.symKeySubject = new BehaviorSubject<ISymmetricKey>(null);
    apiService.hcl.init();
    apiService.hcl.getModule().then((m) => {
      window['hcl'] = m;
      const key = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (key) {
        this.key = key;
      }
    });
    this.$tokenSubject = new BehaviorSubject<ITokenResource>(null);
    const existing = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (existing) {
      this.$tokenSubject.next(JSON.parse(existing));
    }
  }
}
