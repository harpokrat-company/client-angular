import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../../../../services/event.service";

@Component({
  selector: 'app-organisation-add',
  templateUrl: './organisation-add.component.html',
  styleUrls: ['./organisation-add.component.scss']
})
export class OrganisationAddComponent implements OnInit {

  constructor(
    private readonly eventService: EventService,
  ) {
  }

  ngOnInit(): void {
  }

  onCreate() {
    this.eventService.organisationsChanged.next();
  }

}
