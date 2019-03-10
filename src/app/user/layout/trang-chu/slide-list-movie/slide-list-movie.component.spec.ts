import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideListMovieComponent } from './slide-list-movie.component';

describe('SlideListMovieComponent', () => {
  let component: SlideListMovieComponent;
  let fixture: ComponentFixture<SlideListMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideListMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideListMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
