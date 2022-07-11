import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { SearchDoctorsWithinChoosenNetworkComponent } from './search-doctors-within-choosen-network/search-doctors-within-choosen-network.component';
import { ChooseNetworkComponent } from './choose-network/choose-network.component';



@NgModule({
  declarations: [
    BookingComponent,
    SearchDoctorsWithinChoosenNetworkComponent,
    ChooseNetworkComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookingModule { }
