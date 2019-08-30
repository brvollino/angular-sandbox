import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomSpoilerComponent } from './random-spoiler.component';
import { SpoilerService } from './spoiler.service';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

describe('RandomSpoilerComponent', () => {
  let component: RandomSpoilerComponent;
  let fixture: ComponentFixture<RandomSpoilerComponent>;
  let spoilerService: SpoilerService;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatSlideToggleModule, MatSnackBarModule ],
      declarations: [ RandomSpoilerComponent ]
    })
    .compileComponents();
    spoilerService = TestBed.get(SpoilerService);
    snackBar = TestBed.get(MatSnackBar);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomSpoilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load a new spoiler', () => {
    // given the spoilerService returns a single spoiler, represented by a marble
    const spoiler = { id: 1, spoiler: 'Bruce Willis is dead' };
    const serviceSpoiler$ = cold('----a', {a: spoiler}); // delayed to ensure async response is handled
    spyOn(spoilerService, 'getRandomSpoiler').and.returnValue(serviceSpoiler$);

    // when the component loads the next random spoiler
    component.nextSpoiler();
    getTestScheduler().flush();

    // then the new spoiler should become available for the view in a property
    expect(component.spoiler).toBe(spoiler);
  });

  it('should display a message message when an error occurs while getting a spoiler', () => {
    // given the spoilerService returns an error
    const serviceSpoiler$ = cold('----#'); // in ascii marbles errors are represented by a '#'
    spyOn(spoilerService, 'getRandomSpoiler').and.returnValue(serviceSpoiler$);
    spyOn(snackBar, 'open');

    // when the component tries to load the next random spoiler
    component.nextSpoiler();
    getTestScheduler().flush();

    // then it should display an error message in a 'snack bar' notification
    expect(snackBar.open).toHaveBeenCalledWith(
      'It was not possible to load your next spoiler.', null, {duration: 3000});
  });
});
