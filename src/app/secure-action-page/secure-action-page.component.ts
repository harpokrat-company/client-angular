import {Component, OnInit} from '@angular/core';
import {Resource, SecureAction, SecureActionService} from "@harpokrat/api";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map, share, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-secure-action-page',
  templateUrl: './secure-action-page.component.html',
  styleUrls: ['./secure-action-page.component.scss']
})
export class SecureActionPageComponent implements OnInit {

  readonly secureActionObservable: Observable<Resource<SecureAction>>;
  readonly tokenObservable: Observable<string>;

  constructor(
    private readonly $secureActionService: SecureActionService,
    private readonly $activatedRoute: ActivatedRoute,
  ) {
    this.secureActionObservable = this.$activatedRoute.queryParams.pipe(
      switchMap((p) => this.$secureActionService.read(p['id'])),
      share(),
    );
    this.tokenObservable = this.$activatedRoute.queryParams.pipe(
      map((p) => p['token']),
    );
  }

  ngOnInit(): void {
  }

}
