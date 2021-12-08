import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowloadLinksComponent } from './dowload-links.component';

describe('DowloadLinksComponent', () => {
  let component: DowloadLinksComponent;
  let fixture: ComponentFixture<DowloadLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DowloadLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DowloadLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
