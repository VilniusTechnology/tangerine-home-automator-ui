import { TestBed } from '@angular/core/testing';

import { LightAutomatorConnectionService } from './light-automator-connection.service';

describe('LightAutomatorConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LightAutomatorConnectionService = TestBed.get(LightAutomatorConnectionService);
    expect(service).toBeTruthy();
  });
});
