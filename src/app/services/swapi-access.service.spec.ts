import { TestBed } from '@angular/core/testing';

import { SwapiAccessService } from './swapi-access.service';

describe('SwapiAccessService', () => {
  let service: SwapiAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
