import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-group-content-list',
  templateUrl: './group-content-list.component.html',
  styleUrls: ['./group-content-list.component.scss']
})
export class GroupContentListComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

}
