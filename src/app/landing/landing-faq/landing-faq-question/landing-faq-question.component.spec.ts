import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFaqQuestionComponent } from './landing-faq-question.component';

describe('LandingFaqQuestionComponent', () => {
  let component: LandingFaqQuestionComponent;
  let fixture: ComponentFixture<LandingFaqQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingFaqQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFaqQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
