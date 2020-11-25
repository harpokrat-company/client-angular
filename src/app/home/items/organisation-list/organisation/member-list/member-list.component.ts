import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IResource, IResourceEndpoint, IUser, IUserEndpoint, IUserResource} from "@harpokrat/client";
import {BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject} from "rxjs";
import {map, shareReplay, switchMap, take} from "rxjs/operators";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {

  refreshSubject: Subject<void>;
  resourceSubject: Subject<IResource>;
  endpointSubject: Subject<IResourceEndpoint<any>>;
  relationshipSubject: Subject<string>;

  usersObservable: Observable<IUserResource[]>;
  subEndpointObservable: Observable<IResourceEndpoint<IUser>>;
  relationshipEndpointObservable: Observable<IResourceEndpoint<void>>;

  @Input() suggestionEndpoint: IUserEndpoint;

  @Input() set resource(value: IResource) {
    this.resourceSubject.next(value);
  }

  @Input() set endpoint(value: IResourceEndpoint<any>) {
    this.endpointSubject.next(value);
  }

  @Input() set relationship(value: string) {
    this.relationshipSubject.next(value);
  }

  constructor() {
    this.resourceSubject = new ReplaySubject<IResource>();
    this.endpointSubject = new ReplaySubject<IResourceEndpoint<any>>();
    this.relationshipSubject = new ReplaySubject<string>();
    this.refreshSubject = new BehaviorSubject(null);
  }

  ngOnInit(): void {
    this.subEndpointObservable = combineLatest([this.resourceSubject, this.endpointSubject, this.relationshipSubject]).pipe(
      map(([res, end, rel]) => end.resource(res.id, rel)),
      shareReplay({refCount: true, bufferSize: 1}),
    );
    this.relationshipEndpointObservable =
      combineLatest([this.resourceSubject, this.endpointSubject, this.relationshipSubject]).pipe(
        map(([res, end, rel]) => end.relationship(res.id, rel)),
        shareReplay({refCount: true, bufferSize: 1}),
      );
    this.usersObservable = this.refreshSubject.pipe(
      switchMap(() => this.subEndpointObservable),
      switchMap((e) => e.readMany()),
    );
  }

  ngOnDestroy(): void {
    this.resourceSubject.complete();
    this.endpointSubject.complete();
    this.relationshipSubject.complete()
  }

  onAddUser(user: IUserResource) {
    this.relationshipEndpointObservable.pipe(
      take(1)
    ).subscribe(async (endpoint) => {
      await endpoint.create([{
        id: user.id,
        type: user.type,
      }] as any);
      this.refreshSubject.next();
    });
  }

  onRemoveUser(user: IUserResource) {
    this.relationshipEndpointObservable.pipe(
      take(1)
    ).subscribe(async (endpoint) => {
      await endpoint.delete([user] as any);
      this.refreshSubject.next();
    });
  }

}
