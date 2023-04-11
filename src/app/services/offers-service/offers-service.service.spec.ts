import { TestBed } from '@angular/core/testing';

import { OffersServiceService } from './offers-service.service';

describe('OffersServiceService', () => {
  let service: OffersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
