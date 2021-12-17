import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerTempComponent } from './video-player-temp.component';

describe('VideoPlayerTempComponent', () => {
  let component: VideoPlayerTempComponent;
  let fixture: ComponentFixture<VideoPlayerTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayerTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
