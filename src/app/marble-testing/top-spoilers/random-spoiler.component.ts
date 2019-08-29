import { Component } from '@angular/core';
import { Spoiler } from './spoiler.model';
import { SpoilerService as SpoilerService } from './spoiler.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-random-spoiler',
  templateUrl: './random-spoiler.component.html',
  styleUrls: ['./random-spoiler.component.scss']
})
export class RandomSpoilerComponent {
  spoiler: Spoiler;
  displayMovies = false;

  constructor(private spoilerService: SpoilerService, private snackBar: MatSnackBar) { }

  nextSpoiler() {
    this.spoilerService.getRandomSpoiler().pipe(take(1)).subscribe({
      next: (newSpoiler) => {
        this.spoiler = newSpoiler;
      },
      error: () => {
        this.snackBar.open('It was not possible to load your next spoiler.', null, {duration: 3000});
      }
    });
  }

  exposeMovies() {
    this.displayMovies = !this.displayMovies;
  }

  hideString(str: string) {
    return str.replace(/\w/g, '*');
  }
}
