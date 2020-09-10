import {Component, OnInit} from '@angular/core';
import {AuthService, OrganizationService} from "@harpokrat/api";
import {defer, Observable} from "rxjs";
import {IOrganizationResource, IResourceIdentifier} from "@harpokrat/client";
import {IDropdownMenuOption} from "../../utils/menu-more-dropdown/menu-more-dropdown.component";
import {EventService} from "../../../../services/event.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss']
})
export class OrganisationListComponent implements OnInit {

  organisationsObservable: Observable<IOrganizationResource[]>;

  constructor(
    private readonly organisationService: OrganizationService,
    private readonly authService: AuthService,
    private readonly eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.organisationsObservable = this.eventService.organisationsChanged.pipe(switchMap(() => this.organisationService.api.client.users.resource(
      (this.authService.currentUser as IResourceIdentifier).id,
      'organizations'
    ).readMany()));
  }

  getOptions(organisation: IOrganizationResource): IDropdownMenuOption[] {
    return [{
      'title': 'New Group',
      'icon': 'create_new_folder',
      'routerLink': '/app/organisations/' + organisation.id + '/groups/add'
    }, {
      'title': 'Delete',
      'class': 'text-danger',
      'icon': 'delete',
      'routerLink': '/app/organisations/' + organisation.id + '/delete',
    }];
  }

}
