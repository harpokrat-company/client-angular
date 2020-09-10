import {Component, OnInit} from '@angular/core';
import {IOrganizationResource, IResourceIdentifier} from "@harpokrat/client";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {OrganizationService} from "@harpokrat/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-organisation-delete',
  templateUrl: './organisation-delete.component.html',
  styleUrls: ['./organisation-delete.component.scss']
})
export class OrganisationDeleteComponent implements OnInit {

  organisationObservable: Observable<IOrganizationResource>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly organizationService: OrganizationService
  ) {
  }

  ngOnInit(): void {
    this.organisationObservable = this.activatedRoute.parent.params.pipe(
      switchMap((p) => this.organizationService.read(p['id']))
    );
  }

}
