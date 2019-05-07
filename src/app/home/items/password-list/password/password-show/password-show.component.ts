import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TempService} from '../../../../../../services/temp.service';

@Component({
  selector: 'app-password-show',
  templateUrl: './password-show.component.html',
  styleUrls: ['./password-show.component.scss']
})
export class PasswordShowComponent implements OnInit {
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
}
