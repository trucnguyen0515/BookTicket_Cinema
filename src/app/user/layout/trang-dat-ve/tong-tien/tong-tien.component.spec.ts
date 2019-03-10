import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TongTienComponent } from './tong-tien.component';

describe('TongTienComponent', () => {
  let component: TongTienComponent;
  let fixture: ComponentFixture<TongTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TongTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
