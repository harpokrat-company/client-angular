import {Component, OnInit} from '@angular/core';
import {IResourceIdentifier} from "@harpokrat/client";
import {defer, Observable} from "rxjs";
import {AuthService} from "../../../harpokrat/src/lib/services/auth.service";
import {UserService} from "../../../harpokrat/src/lib/services/user.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logsObservable: Observable<any[]>;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.logsObservable = defer(() => this.userService.endpoint.resource((this.authService.currentUser as IResourceIdentifier).id, 'logs').readMany());
  }

}
