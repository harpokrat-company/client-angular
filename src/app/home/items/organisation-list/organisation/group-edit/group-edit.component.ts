import {Component, OnInit} from '@angular/core';
import {IGroupResource, IResourceIdentifier} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../../../../services/event.service";
import {Observable} from "rxjs";
import {GroupService} from "@harpokrat/api";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

  organisationObservable: Observable<IResourceIdentifier>;

  groupObservable: Observable<IGroupResource>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
    readonly groupService: GroupService,
  ) {
  }

  ngOnInit(): void {
    this.organisationObservable = this.activatedRoute.parent.parent.params.pipe(
      map((p) => ({
        type: 'organizations',
        id: p['id']
      })));
    this.groupObservable = this.eventService.groupsChanged.pipe(
      switchMap(() => this.activatedRoute.parent.params),
      switchMap((p) => this.groupService.read(p['groupId'])),
    );
  }

  onCreate() {
    this.eventService.groupsChanged.next();
  }

}
