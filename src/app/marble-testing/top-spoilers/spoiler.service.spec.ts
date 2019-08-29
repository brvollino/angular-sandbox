import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Spoiler } from './spoiler.model';
import { SpoilerService } from './spoiler.service';


describe('SpoilerService', () => {
  let service: SpoilerService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule]
    });
    service = TestBed.get(SpoilerService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should get a random spoiler', () => {
    // given
    const spoiler1: Spoiler = { id: 1, spoiler: 'Bruce Willis is dead'};
    const spoiler2: Spoiler = { id: 2, spoiler: "Brad Pitt is Edward Norton's alter ego"};
    const spoilers = cold('---L', {L: [spoiler1, spoiler2]});
    const expectedRandomSpoiler = cold('---a', {a: spoiler2} );

    spyOn(httpClient, 'get').and.returnValue(spoilers);
    spyOn(service, 'randomIndex').and.returnValue(1);

    // when
    const actualRandomSpoiler = service.getRandomSpoiler();
    getTestScheduler().flush();

    // then
    expect(actualRandomSpoiler).toBeObservable(expectedRandomSpoiler);
  });
});
