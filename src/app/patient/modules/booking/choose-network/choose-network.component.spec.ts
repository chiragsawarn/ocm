import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseNetworkComponent } from './choose-network.component';

describe('ChooseNetworkComponent', () => {
  let component: ChooseNetworkComponent;
  let fixture: ComponentFixture<ChooseNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
