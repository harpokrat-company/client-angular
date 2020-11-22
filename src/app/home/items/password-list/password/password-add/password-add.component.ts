import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {defer, Observable} from "rxjs";
import {IVaultResource} from "@harpokrat/client";
import {ApiService} from "../../../../../../harpokrat/src/lib/services/api.service";
import {AuthService} from "../../../../../../harpokrat/src/lib/services/auth.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-password-add',
  templateUrl: './password-add.component.html',
  styleUrls: ['./password-add.component.scss']
})
export class PasswordAddComponent {

  vaultObservable: Observable<IVaultResource>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {
    this.vaultObservable = defer(
      () => this.apiService.client.users.resource(authService.currentUser.id, 'vaults').readMany()
    ).pipe(
      map((arr) => arr[0]),
    );
  }

  public cancel() {
    this.router.navigate(['..'], {relativeTo: this.route}).then();
  }

  public open(event) {
    this.router.navigate(['../' + event.id], {relativeTo: this.route}).then();
  }
}
