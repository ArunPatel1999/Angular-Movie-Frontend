import { TestBed } from '@angular/core/testing';

import { AuthonticationService } from './authontication.service';

describe('AuthonticationService', () => {
  let service: AuthonticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthonticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
