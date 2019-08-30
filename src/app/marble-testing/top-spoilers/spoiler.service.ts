import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reduce, map } from 'rxjs/operators';
import { Spoiler } from './spoiler.model';

@Injectable({
  providedIn: 'root'
})
export class SpoilerService {
  constructor(private httpClient: HttpClient) { }

  // Requests a list of spoilers from a REST service map it to return a single random spoiler
  public getRandomSpoiler(): Observable<Spoiler> {
    const uri = 'http://localhost:3000/spoilers/';
    return this.httpClient.get<Spoiler[]>(uri) // [#1, #2, #3]
      .pipe(
        map(spoilers => spoilers[this.randomIndex(spoilers)]) // #X
      );
  }

  randomIndex(spoilers) {
    return Math.floor(Math.random() * spoilers.length);
  }
}
