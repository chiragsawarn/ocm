import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSwitchComponent } from './login-switch.component';

describe('LoginSwitchComponent', () => {
  let component: LoginSwitchComponent;
  let fixture: ComponentFixture<LoginSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
