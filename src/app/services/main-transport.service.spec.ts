import { TestBed } from '@angular/core/testing';

import { MainTransportService } from './main-transport.service';

describe('MainTransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainTransportService = TestBed.get(MainTransportService);
    expect(service).toBeTruthy();
  });
});
