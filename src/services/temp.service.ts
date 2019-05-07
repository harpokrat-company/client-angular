import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {TempPassword} from './temp-password';
import {LoginForm} from '../model/login-form';

/* TODO : replace with ng-lib */
/**
 * @deprecated
 */
@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor() { }

  private currentId = 4;
  private passwords = [
    {
      id: 0,
      name: 'Google',
      secret: 'bfqsdhfbqsjdbfqj',
      domain: 'https://gitlab.com/users/sign_in',
      icon: 'https://img.icons8.com/color/420/gitlab.png'
    },
    {
      id: 1,
      name: 'Mozilla',
      secret: 'bfqsdhfbqsjdbfqj',
      domain: 'https://gitlab.com/users/sign_in',
      icon: 'https://img.icons8.com/color/420/gitlab.png'
    },
    {
      id: 2,
      name: 'Free',
      secret: 'bfqsdhfbqsjdbfqj',
      domain: 'https://gitlab.com/users/sign_in',
      icon: 'https://img.icons8.com/color/420/gitlab.png'
    },
    {
      id: 3,
      name: 'Gitlab',
      secret: 'bfqsdhfbqsjdbfqj',
      domain: 'https://gitlab.com/users/sign_in',
      icon: 'https://img.icons8.com/color/420/gitlab.png'
    },
    {
      id: 4,
      name: 'Amazon',
      secret: 'bfqsdhfbqsjdbfqj',
      domain: 'https://gitlab.com/users/sign_in',
      icon: 'https://img.icons8.com/color/420/gitlab.png'
    }
  ];

  private fakeUser = {
    user: 'user1'
  };

  private findId(id: number) {
    for (let i = 0; i <= this.currentId; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.passwords[i] && this.passwords[i].id == id) {
        return i;
      }
    }
    return null;
  }

  public getPasswords(): Observable<TempPassword[]> {
    console.log('getPasswords');
    return of(this.passwords);
  }

  public getPassword(id: number): Observable<TempPassword> {
    console.log('getPassword', id);
    return of(this.passwords[this.findId(id)]);
  }

  public delPassword(id: number): Observable<TempPassword> {
    console.log('delPassword', id);
    const old = this.passwords[this.findId(id)];
    this.passwords[this.findId(id)] = null;
    return of(old);
  }

  public addPassword(password: TempPassword): Observable<TempPassword> {
    console.log('addPassword', password);
    this.currentId++;
    password.id = this.currentId;
    this.passwords[this.currentId] = password;
    return of(password);
  }

  public updatePassword(id: number, password: TempPassword): Observable<TempPassword> {
    console.log('updatePassword', id, password);
    const realId = this.findId(id);
    if (password.name) {
      this.passwords[realId].name = password.name;
    }
    if (password.domain) {
      this.passwords[realId].domain = password.domain;
    }
    if (password.secret) {
      this.passwords[realId].secret = password.secret;
    }
    if (password.icon) {
      this.passwords[realId].icon = password.icon;
    }
    return of(this.passwords[realId]);
  }

  public login(login: LoginForm) {
    console.log('login', login);
    return of(this.fakeUser);
  }

  public me() {
    console.log('me');
    return of(this.fakeUser);
  }
}
