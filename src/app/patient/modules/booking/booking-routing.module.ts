import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { PcpComponent } from './pcp/pcp.component';
import { InNetworkComponent } from './in-network/in-network.component';

const routes: Routes = [
  {
    path:'booking',
    component:BookingComponent,
    children:[
      {
        path:'pcp',
        component:PcpComponent
      },
      {
        path:'in-network',
        component:InNetworkComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class BookingRoutingModule { }