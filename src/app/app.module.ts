import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './home/menu/menu.component';
import {PasswordListComponent} from './home/items/password-list/password-list.component';
import {PasswordEditComponent} from './home/items/password-list/password/password-edit/password-edit.component';
import {PasswordShowComponent} from './home/items/password-list/password/password-show/password-show.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordFormComponent} from './home/utils/password-form/password-form.component';
import {PasswordAddComponent} from './home/items/password-list/password/password-add/password-add.component';
import {PasswordDeleteComponent} from './home/items/password-list/password/password-delete/password-delete.component';
import {PasswordDeleteFormComponent} from './home/utils/password-delete-form/password-delete-form.component';
import {PasswordAddFormComponent} from './home/utils/password-add-form/password-add-form.component';
import {PasswordEditFormComponent} from './home/utils/password-edit-form/password-edit-form.component';
import {PassportViewerComponent} from './home/utils/passport-viewer/passport-viewer.component';
import {HarpokratModule} from '@harpokrat/api';
import {environment} from '../environments/environment';
import {LoginHomeComponent} from './login/login-home.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {ForgotPasswordComponent} from './login/forget-password/forgot-password.component';
import {ForgetPasswordFormComponent} from './login/forget-password/forget-password-form/forget-password-form.component';
import {LandingComponent} from './landing/landing.component';
import {LandingNavbarComponent} from './landing/landing-navbar/landing-navbar.component';
import { LandingShortTextCardComponent } from './landing/landing-short-text-card/landing-short-text-card.component';
import { LandingBigTextComponent } from './landing/landing-big-text/landing-big-text.component';
import { LandingFaqComponent } from './landing/landing-faq/landing-faq.component';
import { LandingFaqQuestionComponent } from './landing/landing-faq/landing-faq-question/landing-faq-question.component';
import { SecureActionPageComponent } from './secure-action-page/secure-action-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginHomeComponent,
    HomeComponent,
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
    ForgotPasswordComponent,
    ForgetPasswordFormComponent,
    LandingComponent,
    LandingNavbarComponent,
    LandingShortTextCardComponent,
    LandingBigTextComponent,
    LandingFaqComponent,
    LandingFaqQuestionComponent,
    SecureActionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HarpokratModule.forRoot(
      environment.apiUrl, {loginRouterPath: '/login'}
    ),
    HarpokratModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
