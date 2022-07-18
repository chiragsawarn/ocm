import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { SearchDoctorsWithinChoosenNetworkComponent } from './search-doctors-within-choosen-network/search-doctors-within-choosen-network.component';
import { PcpComponent } from './pcp/pcp.component';
import { InNetworkComponent } from './in-network/in-network.component';
import { RouterModule } from '@angular/router';
import { BookingRoutingModule } from './booking-routing.module';


@NgModule({
  declarations: [
    BookingComponent,
    SearchDoctorsWithinChoosenNetworkComponent,
    PcpComponent,
    InNetworkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
