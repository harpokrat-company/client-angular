import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  groupsChanged: Subject<void>;
  vaultsChanged: Subject<void>;
  organisationsChanged: Subject<void>;

  constructor() {
    this.organisationsChanged = new BehaviorSubject(null);
    this.vaultsChanged = new BehaviorSubject(null);
    this.groupsChanged = new BehaviorSubject(null);
  }
}
