import {Component, OnInit} from '@angular/core';
import {AuthService, Resource, ResourceIdentifier, SecretService} from "@harpokrat/api";
import {switchMap} from "rxjs/operators";
import {HclwService, Secret} from "@harpokrat/hcl";
import {combineLatest, Observable, of} from "rxjs";

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {

  constructor(
    private readonly secretService: SecretService,
    private readonly hclService: HclwService,
    private readonly $authService: AuthService,
  ) {
  }

  public secrets: Observable<Resource<Secret>[]>;

  public getPasswords() {
    this.secrets = this.secretService.getManyReadableSecrets({});
  }

  ngOnInit() {
    this.getPasswords();
  }
}
