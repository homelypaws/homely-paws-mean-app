import { TestBed, inject } from '@angular/core/testing';

import { HealthcareService } from './healthcare.service';

describe('HealthcareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthcareService]
    });
  });

  it('should be created', inject([HealthcareService], (service: HealthcareService) => {
    expect(service).toBeTruthy();
  }));
});
