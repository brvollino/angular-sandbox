import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reduce, map } from 'rxjs/operators';
import { Spoiler } from './spoiler.model';

@Injectable({
  providedIn: 'root'
})
export class SpoilerService {
  constructor(private http: HttpClient) { }

  public getRandomSpoiler(): Observable<Spoiler> {
    const uri = 'http://localhost:3000/spoilers/';
    return this.http.get<Spoiler[]>(uri) // [#1, #2, #3]
      .pipe(
        map(spoilers => spoilers[this.randomIndex(spoilers)]) // #X
      );
  }

  randomIndex(spoilers) {
    return Math.floor(Math.random() * spoilers.length);
  }
}
