import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonSoLuongVeComponent } from './chon-so-luong-ve.component';

describe('ChonSoLuongVeComponent', () => {
  let component: ChonSoLuongVeComponent;
  let fixture: ComponentFixture<ChonSoLuongVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonSoLuongVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonSoLuongVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
