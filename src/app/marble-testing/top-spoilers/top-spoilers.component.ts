import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, zip, Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { MovieSpoilerService } from './movie-spoiler.service';
import { Spoiler } from './spoiler.model';

@Component({
  selector: 'app-top-spoilers',
  templateUrl: './top-spoilers.component.html',
  styleUrls: ['./top-spoilers.component.scss']
})
export class TopSpoilersComponent implements OnInit {
  displayMovies = false;
  spoilers: Spoiler[] = [];
  showNextSpoiler = new Subject<any>();

  constructor(private movieSpoilerService: MovieSpoilerService) { }

  ngOnInit() {
    zip(
      this.showNextSpoiler.asObservable(),
      this.movieSpoilerService.getTopSpoilers().pipe(
        flatMap(topSpoilers => topSpoilers)
      )
    ).subscribe(([_, spoiler]) => this.spoilers.push(spoiler));
  }

  spoil() {
    this.showNextSpoiler.next('next');
  }

  exposeMovies() {
    this.displayMovies = !this.displayMovies;
  }

  hideName(name: string) {
    return name.replace(/\w/g, '*');
  }
}
