import { TestBed } from '@angular/core/testing';

import { MovieSpoilerService } from './movie-spoiler.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Spoiler } from './spoiler.model';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('MovieSpoilerService', () => {
  let service: MovieSpoilerService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule]
    });
    service = TestBed.get(MovieSpoilerService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should get top spoilers in ascending order', () => {
    // given
    const spoiler1: Spoiler = { rank: 1, spoiler: 'Bruce Willis is dead', movieId: 1};
    const spoiler2: Spoiler = { rank: 2, spoiler: "Brad Pitt is Edward Norton's alter ego", movieId: 2};
    const spoiler3: Spoiler = { rank: 3, spoiler: 'Leonardo di Caprio is crazy', movieId: 3};
    const ranking = cold('--x', {x: [spoiler1, spoiler2, spoiler3]});
    spyOn(httpClient, 'get').and.returnValue(ranking);
    const expectedTopSpoilers = cold('--x', {x: [spoiler3, spoiler2, spoiler1]} );

    // when
    const actual = service.getTopSpoilers();
    getTestScheduler().flush();

    // then
    expect(actual).toBeObservable(expectedTopSpoilers);
  });
});
