import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-password-add',
  templateUrl: './password-add.component.html',
  styleUrls: ['./password-add.component.scss']
})
export class PasswordAddComponent {
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  public cancel() {
    this.router.navigate(['..'], {relativeTo: this.route}).then();
  }

  public open(event) {
    this.router.navigate(['../' + event.id], {relativeTo: this.route}).then();
  }
}
