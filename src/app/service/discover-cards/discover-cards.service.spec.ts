import { TestBed, inject } from '@angular/core/testing';

import { DiscoverCardsService } from './discover-cards.service';

describe('DiscoverCardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoverCardsService]
    });
  });

  it('should be created', inject([DiscoverCardsService], (service: DiscoverCardsService) => {
    expect(service).toBeTruthy();
  }));
});
