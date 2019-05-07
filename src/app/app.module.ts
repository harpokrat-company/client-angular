import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { MenuComponent } from './home/menu/menu.component';
import { PasswordListComponent } from './home/items/password-list/password-list.component';
import { PasswordEditComponent } from './home/items/password-list/password/password-edit/password-edit.component';
import { PasswordShowComponent } from './home/items/password-list/password/password-show/password-show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordFormComponent } from './home/utils/password-form/password-form.component';
import { PasswordAddComponent } from './home/items/password-list/password/password-add/password-add.component';
import { PasswordDeleteComponent } from './home/items/password-list/password/password-delete/password-delete.component';
import { PasswordDeleteFormComponent } from './home/utils/password-delete-form/password-delete-form.component';
import { PasswordAddFormComponent } from './home/utils/password-add-form/password-add-form.component';
import { PasswordEditFormComponent } from './home/utils/password-edit-form/password-edit-form.component';
import { PassportViewerComponent } from './home/utils/passport-viewer/passport-viewer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavbarModule } from 'angular-bootstrap-md';
import { HarpokratModule } from '@harpokrat/api';
import { environment } from '../environments/environment';
import { LoginHomeComponent } from './login/login-home.component';
import { LoginFormComponent } from './login/login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register/register-form/register-form.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { ForgetPasswordFormComponent } from './login/forget-password/forget-password-form/forget-password-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginHomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomeComponent,
    NavbarComponent,
    MenuComponent,
    PasswordListComponent,
    PasswordEditComponent,
    PasswordShowComponent,
    PasswordFormComponent,
    PasswordAddComponent,
    PasswordDeleteComponent,
    PasswordDeleteFormComponent,
    PasswordAddFormComponent,
    PasswordEditFormComponent,
    PassportViewerComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ForgetPasswordFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NavbarModule,
    HarpokratModule.forRoot(
      environment.apiUrl, { loginRouterPath: '/login' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
