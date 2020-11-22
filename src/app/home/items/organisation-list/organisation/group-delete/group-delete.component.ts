import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IGroupResource} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {GroupService} from "../../../../../../harpokrat/src/lib/services/group.service";

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.scss']
})
export class GroupDeleteComponent implements OnInit {

  groupObservable: Observable<IGroupResource>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly groupService: GroupService
  ) {
  }

  ngOnInit(): void {
    this.groupObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.groupService.read(p['groupId']))
    );
  }

}
