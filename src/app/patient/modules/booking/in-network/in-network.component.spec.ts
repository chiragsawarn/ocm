import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InNetworkComponent } from './in-network.component';

describe('InNetworkComponent', () => {
  let component: InNetworkComponent;
  let fixture: ComponentFixture<InNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
