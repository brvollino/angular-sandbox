import { TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, zip } from 'rxjs';

describe('RxJS operators', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('filter operator', () => {
it('should zip elements', () => {
  // Given two source and a result observable represented by these marbles
  const numbers$: Observable<number> = cold('           -1-2-----3-4--5-|');
  const chars$: Observable<string> = cold('             --A-B--CD-------|');
  const expected$: Observable<[string, string]> = cold('--X-Y----W-Z----|', {
      X: ['1', 'A'],
      Y: ['2', 'B'],
      W: ['3', 'C'],
      Z: ['4', 'D'] // emitted objects have to be mapped to the symbols in the marble
  });
  // When the zip operator is applied to the source marbles
  const actual$ = zip(numbers$, chars$);
  getTestScheduler().flush();

  // The actual resultant observable should be equal to the expected marble
  expect(actual$).toBeObservable(expected$);
});
  });
});
