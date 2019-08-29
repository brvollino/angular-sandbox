import { TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, zip } from 'rxjs';

describe('RxJS operators', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('filter operator', () => {
    it('should filter elements', () => {
      const numbersObservable: Observable<number> =  cold('-1-2-----3-4--5-|');
      const charsObservable: Observable<string> =    cold('--A-B--CD-------|');
      const expected: Observable<[string, string]> = cold('--X-Y----W-Z----|',
        {
          X: ['1', 'A'],
          Y: ['2', 'B'],
          W: ['3', 'C'],
          Z: ['4', 'D'],
        });

      const actualResult = zip(numbersObservable, charsObservable);
      getTestScheduler().flush();

      expect(actualResult).toBeObservable(expected);
    });
  });
});
