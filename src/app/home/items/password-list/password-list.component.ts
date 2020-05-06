import {Component, OnInit} from '@angular/core';
import {Resource, SecretService} from "@harpokrat/api";
import {Secret} from "@harpokrat/hcl";
import {merge, Observable, of} from "rxjs";

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

  public secrets: Observable<Resource<Secret>[]>;

  public getPasswords() {
    this.secrets = merge(
      of([]),
      this.secretService.getManyReadableSecrets({})
    );
  }

  ngOnInit() {
    this.getPasswords();
  }
}
