import { Component, OnInit } from '@angular/core';
import {TempService} from '../../../../services/temp.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {

  constructor(private tempService: TempService) { }

  public passwords$;

  public getPasswords() {
    this.passwords$ = this.tempService.getPasswords();
  }

  ngOnInit() {
    this.getPasswords();
  }
}
