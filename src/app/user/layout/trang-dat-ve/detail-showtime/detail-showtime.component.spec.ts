import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShowtimeComponent } from './detail-showtime.component';

describe('DetailShowtimeComponent', () => {
  let component: DetailShowtimeComponent;
  let fixture: ComponentFixture<DetailShowtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailShowtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailShowtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
