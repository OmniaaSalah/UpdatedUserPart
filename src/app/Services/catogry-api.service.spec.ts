import { TestBed } from '@angular/core/testing';

import { CatogryAPIService } from './catogry-api.service';

describe('CatogryAPIService', () => {
  let service: CatogryAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatogryAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
