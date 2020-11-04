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
import {HarpokratModule} from '@harpokrat/api';
import {environment} from '../environments/environment';
import {LoginHomeComponent} from './login/login-home.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {ForgotPasswordComponent} from './login/forget-password/forgot-password.component';
import {ForgetPasswordFormComponent} from './login/forget-password/forget-password-form/forget-password-form.component';
import {LandingComponent} from './landing/landing.component';
import {LandingNavbarComponent} from './landing/landing-navbar/landing-navbar.component';
import {LandingShortTextCardComponent} from './landing/landing-short-text-card/landing-short-text-card.component';
import {LandingBigTextComponent} from './landing/landing-big-text/landing-big-text.component';
import {LandingFaqComponent} from './landing/landing-faq/landing-faq.component';
import {LandingFaqQuestionComponent} from './landing/landing-faq/landing-faq-question/landing-faq-question.component';
import {SecureActionPageComponent} from './secure-action-page/secure-action-page.component';
import {ProfileComponent} from './home/profile/profile.component';
import {OrganisationListComponent} from './home/items/organisation-list/organisation-list.component';
import {OrganisationAddComponent} from './home/items/organisation-list/organisation/organisation-add/organisation-add.component';
import {OrganisationDeleteComponent} from './home/items/organisation-list/organisation/organisation-delete/organisation-delete.component';
import {ContentListComponent} from './home/items/organisation-list/organisation/content-list/content-list.component';
import {MenuDropdownComponent} from './home/utils/menu-dropdown/menu-dropdown.component';
import { GroupAddComponent } from './home/items/organisation-list/organisation/group-add/group-add.component';
import { VaultAddComponent } from './home/items/organisation-list/organisation/vault-add/vault-add.component';
import { GroupDeleteComponent } from './home/items/organisation-list/organisation/group-delete/group-delete.component';
import {ClickOutsideModule} from "ng-click-outside";
import { MenuMoreDropdownComponent } from './home/utils/menu-more-dropdown/menu-more-dropdown.component';
import { VaultDeleteComponent } from './home/items/organisation-list/organisation/vault-delete/vault-delete.component';
import { VaultShowComponent } from './home/items/organisation-list/organisation/vault-show/vault-show.component';
import {HclwService} from "@harpokrat/hcl";
import { OrganisationEditComponent } from './home/items/organisation-list/organisation/organisation-edit/organisation-edit.component';
import { GroupEditComponent } from './home/items/organisation-list/organisation/group-edit/group-edit.component';
import { VaultEditComponent } from './home/items/organisation-list/organisation/vault-edit/vault-edit.component';
import {CommonModule} from "@angular/common";
import { MemberListComponent } from './home/items/organisation-list/organisation/member-list/member-list.component';
import { AddUserFormComponent } from './home/items/organisation-list/organisation/member-list/add-user-form/add-user-form.component';

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
    SecureActionPageComponent,
    ProfileComponent,
    OrganisationListComponent,
    OrganisationAddComponent,
    OrganisationDeleteComponent,
    ContentListComponent,
    MenuDropdownComponent,
    GroupAddComponent,
    VaultAddComponent,
    GroupDeleteComponent,
    MenuMoreDropdownComponent,
    VaultDeleteComponent,
    VaultShowComponent,
    OrganisationEditComponent,
    GroupEditComponent,
    VaultEditComponent,
    MemberListComponent,
    AddUserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    HarpokratModule.forRoot(
      environment.apiUrl, {loginRouterPath: '/login'}, new HclwService(),
    ),
    HarpokratModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
