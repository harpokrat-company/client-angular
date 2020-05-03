import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingShortTextCardComponent } from './landing-short-text-card.component';

describe('LandingShortTextCardComponent', () => {
  let component: LandingShortTextCardComponent;
  let fixture: ComponentFixture<LandingShortTextCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingShortTextCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingShortTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
