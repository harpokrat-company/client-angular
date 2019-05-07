import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormComponent } from './password-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NavbarModule} from 'angular-bootstrap-md';
import {AppComponent} from '../../../app.component';
import {HomeComponent} from '../../home.component';
import {NavbarComponent} from '../../navbar/navbar.component';
import {MenuComponent} from '../../menu/menu.component';
import {PasswordListComponent} from '../../items/password-list/password-list.component';
import {PasswordEditComponent} from '../../items/password-list/password/password-edit/password-edit.component';
import {PasswordShowComponent} from '../../items/password-list/password/password-show/password-show.component';
import {PasswordAddComponent} from '../../items/password-list/password/password-add/password-add.component';
import {PasswordDeleteComponent} from '../../items/password-list/password/password-delete/password-delete.component';
import {PasswordDeleteFormComponent} from '../password-delete-form/password-delete-form.component';
import {PasswordAddFormComponent} from '../password-add-form/password-add-form.component';
import {PasswordEditFormComponent} from '../password-edit-form/password-edit-form.component';
import {PassportViewerComponent} from '../passport-viewer/passport-viewer.component';

describe('PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
        PassportViewerComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        NavbarModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
