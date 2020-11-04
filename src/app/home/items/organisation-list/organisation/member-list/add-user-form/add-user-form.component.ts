import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUserResource} from "@harpokrat/client";
import {UserService} from "@harpokrat/api";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  formGroup: FormGroup;

  submitted: boolean;

  @Output() save = new EventEmitter<IUserResource>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.formGroup = this.fb.group({
      'email': ['', [Validators.email, Validators.required]],
    });
    this.submitted = false;
  }

  onSubmit() {
    this.userService.readAll({
      size: 1, filters: {
        email: this.formGroup.get('email').value,
      },
    }).subscribe((users) => {
      if (users[0] != null) {
        console.log(users)
        this.save.emit(users[0])
      }
      this.reset();
    });
  }

}
