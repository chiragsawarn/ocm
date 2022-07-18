import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { ViewBookingsModule } from './modules/view-bookings/view-bookings.module';
import { RouterModule } from '@angular/router';
import { PatientRoutingModule } from './patient-routing.module';
import { BookingModule } from './modules/booking/booking.module';


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    ViewBookingsModule,
    BookingModule,
    RouterModule,
    PatientRoutingModule
  ]
})
export class PatientModule { } 
