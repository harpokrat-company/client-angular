import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PasswordListComponent} from './items/password-list/password-list.component';
import {PasswordAddComponent} from './items/password-list/password/password-add/password-add.component';
import {PasswordEditComponent} from './items/password-list/password/password-edit/password-edit.component';
import {PasswordDeleteComponent} from './items/password-list/password/password-delete/password-delete.component';
import {PasswordShowComponent} from './items/password-list/password/password-show/password-show.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordListComponent,
        PasswordAddComponent,
        PasswordEditComponent,
        PasswordDeleteComponent,
        PasswordShowComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'passwords', component: PasswordListComponent, children: [
              { path: 'add', component: PasswordAddComponent},
              { path: ':id', redirectTo: ':id/show'},
              { path: ':id/edit', component: PasswordEditComponent},
              { path: ':id/delete', component: PasswordDeleteComponent},
              { path: ':id/show', component: PasswordShowComponent},
            ]
          }
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
