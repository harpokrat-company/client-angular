import {Component, OnInit} from '@angular/core';
import {IResourceIdentifier} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../../../../services/event.service";

@Component({
  selector: 'app-vault-add',
  templateUrl: './vault-add.component.html',
  styleUrls: ['./vault-add.component.scss']
})
export class VaultAddComponent implements OnInit {

  group: IResourceIdentifier;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.parent.snapshot;
    const groupId = snapshot.params['groupId'];
    this.group = {
      type: 'groups',
      id: groupId,
    }
  }

  onCreate() {
    this.eventService.vaultsChanged.next();
  }
}
