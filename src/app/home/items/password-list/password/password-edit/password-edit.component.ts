import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TempService} from '../../../../../../services/temp.service';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private tempService: TempService) { }

  public password$;

  public getPassword(passwordId) {
    this.password$ = this.tempService.getPassword(passwordId);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPassword(params.get('id'));
    });
  }

  public toShow() {
    this.router.navigate(['../show'], { relativeTo: this.route });
  }
}
