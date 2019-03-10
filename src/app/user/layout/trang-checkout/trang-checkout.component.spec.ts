import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangCheckoutComponent } from './trang-checkout.component';

describe('TrangCheckoutComponent', () => {
  let component: TrangCheckoutComponent;
  let fixture: ComponentFixture<TrangCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
