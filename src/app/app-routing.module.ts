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
import {LandingComponent} from "./landing/landing.component";
import {SecureActionPageComponent} from "./secure-action-page/secure-action-page.component";
import {ProfileComponent} from "./home/profile/profile.component";
import {OrganisationListComponent} from "./home/items/organisation-list/organisation-list.component";
import {OrganisationAddComponent} from "./home/items/organisation-list/organisation/organisation-add/organisation-add.component";
import {OrganisationDeleteComponent} from "./home/items/organisation-list/organisation/organisation-delete/organisation-delete.component";
import {GroupAddComponent} from "./home/items/organisation-list/organisation/group-add/group-add.component";
import {VaultAddComponent} from "./home/items/organisation-list/organisation/vault-add/vault-add.component";
import {GroupDeleteComponent} from "./home/items/organisation-list/organisation/group-delete/group-delete.component";
import {VaultDeleteComponent} from "./home/items/organisation-list/organisation/vault-delete/vault-delete.component";
import {VaultShowComponent} from "./home/items/organisation-list/organisation/vault-show/vault-show.component";
import {OrganisationEditComponent} from "./home/items/organisation-list/organisation/organisation-edit/organisation-edit.component";
import {GroupEditComponent} from "./home/items/organisation-list/organisation/group-edit/group-edit.component";
import {VaultEditComponent} from "./home/items/organisation-list/organisation/vault-edit/vault-edit.component";
import {LogsComponent} from "./home/logs/logs.component";
import {AuthGuard} from "../harpokrat/src/lib/guards/auth.guard";
import {VaultPasswordShowComponent} from "./home/items/organisation-list/organisation/vault-password-show/vault-password-show.component";

const routes: Routes = [
  {
    path: '', component: LandingComponent,
  },
  {
    path: 'secure-action', component: SecureActionPageComponent,
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
        path: '', component: ProfileComponent
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'passwords', component: PasswordListComponent, children: [
          {path: 'add', component: PasswordAddComponent},
          {path: ':id', redirectTo: ':id/show'},
          {path: ':id/edit', component: PasswordEditComponent},
          {path: ':id/delete', component: PasswordDeleteComponent},
          {path: ':id/show', component: PasswordShowComponent},
        ]
      },
      {
        path: 'organisations', redirectTo: 'organisations/', pathMatch: 'full',
      },
      {
        path: 'organisations/:id', component: OrganisationListComponent, children: [{
          path: 'delete',
          component: OrganisationDeleteComponent,
        }, {
          path: 'edit',
          component: OrganisationEditComponent,
        }, {
          path: 'groups/add',
          component: GroupAddComponent,
        }, {
          path: 'groups/:groupId',
          children: [{
            path: 'edit',
            component: GroupEditComponent,
          }, {
            path: 'delete',
            component: GroupDeleteComponent,
          }, {
            path: 'vaults/add',
            component: VaultAddComponent,
          }, {
            path: 'vaults/:vaultId',
            children: [{
              path: '',
              component: VaultShowComponent,
            }, {
              path: 'secrets/:secretId',
              component: VaultPasswordShowComponent,
            }, {
              path: 'edit',
              component: VaultEditComponent,
            }, {
              path: 'delete',
              component: VaultDeleteComponent,
            }]
          }],
        }, {
          path: '**', component: OrganisationAddComponent,
        }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
