import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/components/login/login.component';
import { LoginSwitchComponent } from './login-switch/login-switch.component';

const routes: Routes = [
  {
    path:'',
    component:LoginSwitchComponent,
  },
  {
    path:'auth',
    component:AuthComponent,
    children:[
      {path: 'forgot-password', component:ForgotPasswordComponent},
      {
        path:'login/:type',
        component:LoginComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
