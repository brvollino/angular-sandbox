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
    // given
    const spoiler = {
      id: 1,
      spoiler: 'Bruce Willis is dead'
    };
    const spoilerObservable = cold('----a', {a: spoiler});
    spyOn(spoilerService, 'getRandomSpoiler').and.returnValue(spoilerObservable);

    // when
    component.nextSpoiler();
    getTestScheduler().flush();

    // then
    expect(component.spoiler).toBe(spoiler);
  });

  it('should display a message message when an error occurs while getting a spoiler', () => {
    // given
    const spoilerObservable = cold('----#');
    spyOn(spoilerService, 'getRandomSpoiler').and.returnValue(spoilerObservable);
    spyOn(snackBar, 'open');

    // when
    component.nextSpoiler();
    getTestScheduler().flush();

    // then
    expect(snackBar.open).toHaveBeenCalledWith('It was not possible to load your next spoiler.', null, {duration: 3000});
  });
});
