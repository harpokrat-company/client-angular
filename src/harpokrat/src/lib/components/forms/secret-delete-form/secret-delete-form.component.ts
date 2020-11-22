import {Component, Input, OnInit} from '@angular/core';
import {SecretService} from '../../../services/secret.service';
import {IResource, IPassword} from '@harpokrat/client';

@Component({
  selector: 'hpk-secret-delete-form',
  templateUrl: './secret-delete-form.component.html',
  styleUrls: ['./secret-delete-form.component.css']
})
export class SecretDeleteFormComponent implements OnInit {

  @Input() secret: IResource<IPassword>;

  constructor(
    readonly secretService: SecretService,
  ) {
  }

  ngOnInit(): void {
  }

}
