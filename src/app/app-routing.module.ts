import {LoginHomeComponent} from './login/login-home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PasswordListComponent} from './home/items/password-list/password-list.component';
import {PasswordShowComponent} from './home/items/password-list/password/password-show/password-show.component';
import {PasswordEditComponent} from './home/items/password-list/password/password-edit/password-edit.component';
import {PasswordAddComponent} from './home/items/password-list/password/password-add/password-add.component';
import {PasswordDeleteComponent} from './home/items/password-list/password/password-delete/password-delete.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {ForgotPasswordComponent} from './login/forget-password/forgot-password.component';
import {AuthGuard} from "@harpokrat/api";
import {LandingComponent} from "./landing/landing.component";

const routes: Routes = [
  {
    path: '', component: LandingComponent,
  },
  {
    path: 'login', component: LoginHomeComponent, children: [
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
    ]
  },
  {
    path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
      {
        path: 'passwords', component: PasswordListComponent, children: [
          {path: 'add', component: PasswordAddComponent},
          {path: ':id', redirectTo: ':id/show'},
          {path: ':id/edit', component: PasswordEditComponent},
          {path: ':id/delete', component: PasswordDeleteComponent},
          {path: ':id/show', component: PasswordShowComponent},
        ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
