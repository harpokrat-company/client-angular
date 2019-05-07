import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHomeComponent } from './login-home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {RegisterFormComponent} from './register/register-form/register-form.component';

describe('LoginHomeComponent', () => {
  let component: LoginHomeComponent;
  let fixture: ComponentFixture<LoginHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginHomeComponent,
        LoginFormComponent,
        RegisterFormComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: LoginFormComponent},
          { path: 'register', component: RegisterFormComponent },
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
