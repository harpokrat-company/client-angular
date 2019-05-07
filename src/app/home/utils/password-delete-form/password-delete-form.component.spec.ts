import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDeleteFormComponent } from './password-delete-form.component';

describe('PasswordDeleteFormComponent', () => {
  let component: PasswordDeleteFormComponent;
  let fixture: ComponentFixture<PasswordDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordDeleteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
