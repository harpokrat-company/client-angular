import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TempService} from '../../../../../../services/temp.service';

@Component({
  selector: 'app-password-delete',
  templateUrl: './password-delete.component.html',
  styleUrls: ['./password-delete.component.scss']
})
export class PasswordDeleteComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private tempService: TempService) {
  }

  public password$;

  public getPassword(passwordId) {
    this.password$ = this.tempService.getPassword(passwordId);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPassword(params.get('id'));
    });
  }

  public toList() {
    this.router.navigate(['../..'], {relativeTo: this.route}).then();
  }

  public toPassword() {
    this.router.navigate(['../show'], {relativeTo: this.route}).then();
  }
}
