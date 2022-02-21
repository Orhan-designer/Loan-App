import { TestBed } from '@angular/core/testing';

import { UsersMemoryDataService } from './users-memory-data.service';

describe('UsersMemoryDataService', () => {
  let service: UsersMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
