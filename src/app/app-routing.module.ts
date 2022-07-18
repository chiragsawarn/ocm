import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSwitchComponent } from './login-switch/login-switch.component';
// import { AuthComponent } from './auth/auth.component';
// import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
// import { LoginComponent } from './auth/components/login/login.component';
// import { BookingComponent } from './patient/modules/booking/booking.component';
// import { InNetworkComponent } from './patient/modules/booking/in-network/in-network.component';
// import { PcpComponent } from './patient/modules/booking/pcp/pcp.component';
// import { ViewBookingsComponent } from './patient/modules/view-bookings/view-bookings.component';
// import { PatientComponent } from './patient/patient.component';
// import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component:LoginSwitchComponent,
  },
  // {
  //   path:'auth',
  //   component:AuthComponent,
  //   children:[
  //     {path: 'forgot-password', component:ForgotPasswordComponent},
  //     {
  //       path:'login/:type',
  //       component:LoginComponent,
  //     },
  //   ]
  // },
  // {
  //   path:'patient',
  //   component:PatientComponent,
  //   canActivate:[AuthGuardService],
  //   children:[
  //     {
  //       path:'booking', component:BookingComponent, children:[
  //         {
  //           path:'pcp',
  //           component:PcpComponent
  //         },
  //         {
  //           path:'in-network',
  //           component:InNetworkComponent
  //         }
  //       ]
  //     },
  //     {
  //       path:'view-bookings', component:ViewBookingsComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuardService]
})
export class AppRoutingModule { }
