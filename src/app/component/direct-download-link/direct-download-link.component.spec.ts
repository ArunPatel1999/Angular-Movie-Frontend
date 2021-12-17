import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDownloadLinkComponent } from './direct-download-link.component';

describe('DirectDownloadLinkComponent', () => {
  let component: DirectDownloadLinkComponent;
  let fixture: ComponentFixture<DirectDownloadLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectDownloadLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDownloadLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
