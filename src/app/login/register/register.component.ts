import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../harpokrat/src/lib/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  register() {
    this.router.navigate(['/login']).then();
  }
}
