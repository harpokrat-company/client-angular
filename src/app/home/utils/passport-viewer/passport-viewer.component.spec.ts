import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportViewerComponent } from './passport-viewer.component';

describe('PassportViewerComponent', () => {
  let component: PassportViewerComponent;
  let fixture: ComponentFixture<PassportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
