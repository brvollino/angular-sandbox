import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Spoiler } from './spoiler.model';

@Injectable({
  providedIn: 'root'
})
export class MovieSpoilerService {
  constructor(private http: HttpClient) { }

  public getTopSpoilers(): Observable<Spoiler[]> {
    const uri = 'http://localhost:3000/spoilers/ranking';

    return this.http.get<Spoiler[]>(uri) // [#1, #2, #3]
      .pipe(
        map(ranking => ranking.reverse()) // [#3, #2, #1]
      );
  }
}
