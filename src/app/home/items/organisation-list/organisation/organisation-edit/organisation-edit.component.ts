import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IOrganizationResource, IUser} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {EventService} from "../../../../../../services/event.service";
import {OrganizationService} from "../../../../../../harpokrat/src/lib/services/organization.service";

@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.scss']
})
export class OrganisationEditComponent implements OnInit {

  organisationObservable: Observable<IOrganizationResource>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
    readonly organizationService: OrganizationService,
  ) {
  }

  ngOnInit(): void {
    this.organisationObservable = this.eventService.organisationsChanged.pipe(
      switchMap(() => this.activatedRoute.parent.params),
      switchMap((p) => this.organizationService.read(p['id']))
    );
  }

  onCreate() {
    this.eventService.organisationsChanged.next();
  }
}
