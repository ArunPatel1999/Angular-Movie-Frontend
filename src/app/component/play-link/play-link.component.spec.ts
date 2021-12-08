import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayLinkComponent } from './play-link.component';

describe('PlayLinkComponent', () => {
  let component: PlayLinkComponent;
  let fixture: ComponentFixture<PlayLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
