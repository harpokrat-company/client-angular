import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IResourceIdentifier} from "@harpokrat/client";
import {EventService} from "../../../../../../services/event.service";

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  organisation: IResourceIdentifier;

  group: IResourceIdentifier;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.organisation = {
      type: 'organizations',
      id: this.activatedRoute.parent.snapshot.params['id']
    }
    const groupId = snapshot.queryParams['parentId'];
    if (groupId) {
      this.group = {
        type: 'groups',
        id: groupId,
      }
    }
  }

  onCreate() {
    this.eventService.groupsChanged.next();
  }

}
