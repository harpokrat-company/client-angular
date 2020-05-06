import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureActionPageComponent } from './secure-action-page.component';

describe('SecureActionPageComponent', () => {
  let component: SecureActionPageComponent;
  let fixture: ComponentFixture<SecureActionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureActionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
