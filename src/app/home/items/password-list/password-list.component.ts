import {Component, OnInit} from '@angular/core';
import {SecretService} from "@harpokrat/api";
import {merge, Observable, of} from "rxjs";
import {ISecretResource} from "@harpokrat/client";

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {

  constructor(
    private readonly secretService: SecretService,
  ) {
  }

  public secrets: Observable<ISecretResource[]>;

  public getPasswords() {
    this.secrets = merge(
      of([]),
      this.secretService.readAll({})
    );
  }

  ngOnInit() {
    this.getPasswords();
  }
}
