import { TestBed } from '@angular/core/testing';

import { LightningLevelService } from './lightning-level.service';

describe('LightningLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LightningLevelService = TestBed.get(LightningLevelService);
    expect(service).toBeTruthy();
  });
});
