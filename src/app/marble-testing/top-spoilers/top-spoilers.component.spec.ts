import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSpoilersComponent } from './top-spoilers.component';
import { HttpClientModule } from '@angular/common/http';

describe('TopSpoilersComponent', () => {
  let component: TopSpoilersComponent;
  let fixture: ComponentFixture<TopSpoilersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ TopSpoilersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSpoilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
