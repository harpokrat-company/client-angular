import {Component, OnInit} from '@angular/core';
import {AuthService, ResourceIdentifier, SecretService} from "@harpokrat/api";
import {switchMap} from "rxjs/operators";
import {HclwService} from "@harpokrat/hcl";
import {combineLatest, of} from "rxjs";

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

  public passwords$;

  public getPasswords() {
    this.passwords$ = this.secretService.readAll({
      filters: {
        'owner.id': (this.$authService.currentUser as ResourceIdentifier).id,
      }
    }).pipe(
      switchMap((secrets) => {
        if (secrets.length > 0) {
          return combineLatest(
            secrets.map((s) => this.hclService.createSecret(this.$authService.key, s.attributes.content)),
          );
        } else {
          return of([]);
        }
      }),
    );
  }

  ngOnInit() {
    this.getPasswords();
  }
}
