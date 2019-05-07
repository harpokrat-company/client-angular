import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordShowComponent } from './password-show.component';

describe('PasswordShowComponent', () => {
  let component: PasswordShowComponent;
  let fixture: ComponentFixture<PasswordShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
