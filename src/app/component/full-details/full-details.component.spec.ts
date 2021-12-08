import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDetailsComponent } from './full-details.component';

describe('FullDetailsComponent', () => {
  let component: FullDetailsComponent;
  let fixture: ComponentFixture<FullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
