import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegister2Component } from './login-register2.component';

describe('LoginRegister2Component', () => {
  let component: LoginRegister2Component;
  let fixture: ComponentFixture<LoginRegister2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegister2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegister2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
