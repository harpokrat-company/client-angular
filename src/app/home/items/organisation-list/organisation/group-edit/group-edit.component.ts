import {Component, OnInit} from '@angular/core';
import {IEndpoint, IGroupResource, IResourceIdentifier, IUserEndpoint} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../../../../services/event.service";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {GroupService} from "../../../../../../harpokrat/src/lib/services/group.service";
import {ApiService} from "../../../../../../harpokrat/src/lib/services/api.service";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

  organisationObservable: Observable<IResourceIdentifier>;

  groupObservable: Observable<IGroupResource>;

  endpointObservable: Observable<IUserEndpoint>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
    private readonly apiService: ApiService,
    readonly groupService: GroupService,
  ) {
  }

  ngOnInit(): void {
    this.organisationObservable = this.activatedRoute.parent.parent.params.pipe(
      map((p) => ({
        type: 'organizations',
        id: p['id']
      })));
    this.endpointObservable = this.organisationObservable.pipe(
      map((org) => this.apiService.client.organizations.resource(org.id, 'members'))
    );
    this.groupObservable = this.eventService.groupsChanged.pipe(
      switchMap(() => this.activatedRoute.parent.params),
      switchMap((p) => this.groupService.read(p['groupId'])),
    );
  }

  onCreate() {
    this.eventService.groupsChanged.next();
  }

}
