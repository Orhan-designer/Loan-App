import { TestBed } from '@angular/core/testing';

import { NewFriendsService } from './new-friends.service';

describe('NewFriendsService', () => {
  let service: NewFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
