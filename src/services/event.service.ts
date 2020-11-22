import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  vaultSecretsChanged: Subject<void>;
  groupsChanged: Subject<void>;
  vaultsChanged: Subject<void>;
  organisationsChanged: Subject<void>;

  constructor() {
    this.vaultSecretsChanged = new BehaviorSubject(null);
    this.organisationsChanged = new BehaviorSubject(null);
    this.vaultsChanged = new BehaviorSubject(null);
    this.groupsChanged = new BehaviorSubject(null);
  }
}
