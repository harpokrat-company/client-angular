import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SecretService} from "@harpokrat/api";
import {Observable} from "rxjs";
import {ISecretResource} from "@harpokrat/client";

@Component({
  selector: 'app-password-show',
  templateUrl: './password-show.component.html',
  styleUrls: ['./password-show.component.scss']
})
export class PasswordShowComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private secretService: SecretService) {
  }

  public secret: Observable<ISecretResource>;

  public getPassword(passwordId) {
    this.secret = this.secretService.read(passwordId);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPassword(params.get('id'));
    });
  }
}
