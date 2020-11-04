import {Component, Input, OnInit} from '@angular/core';
import {IGroupResource, IOrganizationResource, IVaultResource} from "@harpokrat/client";
import {GroupService} from "@harpokrat/api";
import {Observable, of} from "rxjs";
import {IDropdownMenuOption} from "../../../../utils/menu-more-dropdown/menu-more-dropdown.component";
import {EventService} from "../../../../../../services/event.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  @Input() organisation: IOrganizationResource;

  @Input() group: IGroupResource;

  groupsObservable: Observable<IGroupResource[]>;

  vaultObservable: Observable<IVaultResource[]>;

  constructor(
    private readonly groupService: GroupService,
    private readonly eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.groupsObservable = this.eventService.groupsChanged.pipe(
      switchMap(() => this.groupService.readAll({
        filters: {
          'organization.id': this.organisation.id,
          'parent.id': (this.group && this.group.id) || 'null',
        },
      })),
    );
    if (this.group) {
      this.vaultObservable = this.eventService.vaultsChanged.pipe(
        switchMap(() => this.groupService.api.client.groups.resource(this.group.id, 'vaults').readMany())
      );
    } else {
      this.vaultObservable = of([]);
    }
  }

  getOptions(group: IGroupResource): IDropdownMenuOption[] {
    return [{
      'title': 'New Vault',
      'icon': 'account_balance',
      'routerLink': '/app/organisations/' + this.organisation.id + '/groups/' + group.id + '/vaults/add'
    }, {
      'title': 'New Group',
      'icon': 'create_new_folder',
      'queryParams': {'parentId': group.id},
      'routerLink': '/app/organisations/' + this.organisation.id + '/groups/add'
    }, {
      'title': 'Edit',
      'icon': 'edit',
      'routerLink': '/app/organisations/' + this.organisation.id + '/groups/' + group.id + '/edit'
    }, {
      'title': 'Delete',
      'class': 'text-danger',
      'icon': 'delete',
      'routerLink': '/app/organisations/' + this.organisation.id + '/groups/' + group.id + '/delete'
    }];
  }

  getVaultOptions(vault: IVaultResource): IDropdownMenuOption[] {
    return [{
      'title': 'Edit',
      'icon': 'edit',
      'routerLink': '/app/organisations/' + this.organisation.id + '/groups/' + this.group.id + '/vaults/' + vault.id + '/edit',
    }, {
      'title': 'Delete',
      'class': 'text-danger',
      'icon': 'delete',
      'routerLink': '/app/organisations/' + this.organisation.id + '/groups/' + this.group.id + '/vaults/' + vault.id + '/delete',
    }];
  }
}
