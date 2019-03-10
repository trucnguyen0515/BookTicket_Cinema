import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCinemaComponent } from './group-cinema.component';

describe('GroupCinemaComponent', () => {
  let component: GroupCinemaComponent;
  let fixture: ComponentFixture<GroupCinemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCinemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
