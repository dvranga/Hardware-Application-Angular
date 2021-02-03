import { TestBed } from '@angular/core/testing';

import { HardwareRequestService } from './hardware-request.service';

describe('HardwareRequestService', () => {
  let service: HardwareRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
