import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-switch',
  templateUrl: './login-switch.component.html',
  styleUrls: ['./login-switch.component.css']
})
export class LoginSwitchComponent implements OnInit {
  type = ['employee','patient','provider'];

  constructor() { }

  ngOnInit(): void {
  }

}
