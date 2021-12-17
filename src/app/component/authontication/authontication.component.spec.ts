import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthonticationComponent } from './authontication.component';

describe('AuthonticationComponent', () => {
  let component: AuthonticationComponent;
  let fixture: ComponentFixture<AuthonticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthonticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthonticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
