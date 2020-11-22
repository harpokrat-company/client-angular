import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IResourceIdentifier, IUser, IUserResource} from "@harpokrat/client";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'hpk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: IUserResource[];

  @Input() allowRemove: boolean = false;

  @Output() remove = new EventEmitter<IUserResource>();

  currentUser: IResourceIdentifier;

  constructor(
    private readonly authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {
  }

}
