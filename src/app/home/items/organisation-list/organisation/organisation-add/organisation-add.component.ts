import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../../../../services/event.service";
import {Router} from "@angular/router";
import {IOrganizationResource} from "@harpokrat/client";

@Component({
  selector: 'app-organisation-add',
  templateUrl: './organisation-add.component.html',
  styleUrls: ['./organisation-add.component.scss']
})
export class OrganisationAddComponent implements OnInit {

  constructor(
    private readonly eventService: EventService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async onCreate(organisation: IOrganizationResource) {
    this.eventService.organisationsChanged.next();
    await this.router.navigate(['/app/organisations/' + organisation.id + '/edit'])
  }

}
