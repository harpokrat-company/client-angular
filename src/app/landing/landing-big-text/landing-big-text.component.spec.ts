import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBigTextComponent } from './landing-big-text.component';

describe('LandingBigTextComponent', () => {
  let component: LandingBigTextComponent;
  let fixture: ComponentFixture<LandingBigTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingBigTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBigTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
