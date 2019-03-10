import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickBookComponent } from './quick-book.component';

describe('QuickBookComponent', () => {
  let component: QuickBookComponent;
  let fixture: ComponentFixture<QuickBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
