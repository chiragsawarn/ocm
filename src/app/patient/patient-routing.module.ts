import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { BookingComponent } from './modules/booking/booking.component';
import { ViewBookingsComponent } from './modules/view-bookings/view-bookings.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { PcpComponent } from './modules/booking/pcp/pcp.component';
import { InNetworkComponent } from './modules/booking/in-network/in-network.component';

const routes: Routes = [
  {
    path: 'patient', component: PatientComponent, canActivate:[AuthGuardService], children: [
      { path: 'booking', component: BookingComponent, children:[
        {
          path:'pcp',
          component:PcpComponent
        },
        {
          path:'in-network',
          component:InNetworkComponent
        }
      ] },
      { path: 'view-bookings', component: ViewBookingsComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})

export class PatientRoutingModule { }
