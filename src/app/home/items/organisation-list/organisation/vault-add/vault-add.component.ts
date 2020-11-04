import {Component, OnInit} from '@angular/core';
import {IResourceIdentifier} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../../../../services/event.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-vault-add',
  templateUrl: './vault-add.component.html',
  styleUrls: ['./vault-add.component.scss']
})
export class VaultAddComponent implements OnInit {

  groupObservable: Observable<IResourceIdentifier>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.groupObservable = this.activatedRoute.parent.params.pipe(
      map((p) => ({type: 'groups', id: p['groupId']}))
    );
  }

  onCreate() {
    this.eventService.vaultsChanged.next();
  }
}
