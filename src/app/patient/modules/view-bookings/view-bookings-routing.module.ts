import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBookingsComponent } from './view-bookings.component';

const routes: Routes = [
  {
    path:'view-bookings',
    component:ViewBookingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBookingsRoutingModule { }
