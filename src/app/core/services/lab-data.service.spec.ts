import { TestBed } from '@angular/core/testing';

import { LabDataService } from './lab-data.service';

describe('LabDataService', () => {
  let service: LabDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
