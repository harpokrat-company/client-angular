import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAddFormComponent } from './password-add-form.component';

describe('PasswordAddFormComponent', () => {
  let component: PasswordAddFormComponent;
  let fixture: ComponentFixture<PasswordAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
