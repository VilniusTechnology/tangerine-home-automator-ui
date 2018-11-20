import { TestBed } from '@angular/core/testing';

import { LithuanianAdminMapSvgLoaderService } from './lithuanian-admin-map-svg-loader.service';

describe('LithuanianAdminMapSvgLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LithuanianAdminMapSvgLoaderService = TestBed.get(LithuanianAdminMapSvgLoaderService);
    expect(service).toBeTruthy();
  });
});
