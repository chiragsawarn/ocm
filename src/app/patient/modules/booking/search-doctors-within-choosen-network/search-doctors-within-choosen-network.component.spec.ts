import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDoctorsWithinChoosenNetworkComponent } from './search-doctors-within-choosen-network.component';

describe('SearchDoctorsWithinChoosenNetworkComponent', () => {
  let component: SearchDoctorsWithinChoosenNetworkComponent;
  let fixture: ComponentFixture<SearchDoctorsWithinChoosenNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDoctorsWithinChoosenNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDoctorsWithinChoosenNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
