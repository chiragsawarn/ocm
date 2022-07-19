import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewBookingsRoutingModule } from './view-bookings-routing.module';
import { ViewBookingsComponent } from './view-bookings.component';


@NgModule({
  declarations: [
    ViewBookingsComponent
  ],
  imports: [
    CommonModule,
    ViewBookingsRoutingModule,
    RouterModule,
  ]
})

export class ViewBookingsModule { }
