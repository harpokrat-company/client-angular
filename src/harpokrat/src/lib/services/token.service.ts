import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AuthService} from './auth.service';
import {ITokenResource} from '@harpokrat/client';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {
  }

  login(email: string, password: string): Observable<ITokenResource> {
    this.apiService.client.auth = {
      email,
      password,
    };
    console.log(this.apiService.client.auth);
    return fromPromise(
      this.apiService.client.jsonWebTokens.create(),
    ).pipe(
      tap((t) => console.log(t)),
      tap(token => this.authService.token = token),
      shareReplay(1),
    );
  }
}
