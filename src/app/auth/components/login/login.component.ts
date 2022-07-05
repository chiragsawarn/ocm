import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
// import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  userIdLabel:string = "User ID";

  constructor(private fb:FormBuilder) { }
  // constructor(private fb:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      type:['',[Validators.required]],
      userId:['',[Validators.required]],
      password:['',[Validators.required]],
      
    })
  }

  changeUserIdLabel(){
    let type = this.loginForm.value.type;
    if(type == "employee") this.userIdLabel = "MS ID";
    else if(type == "provider") this.userIdLabel = "One Healthcare ID";
    else if(type == "patient") this.userIdLabel = "HealthSafe ID";
  }

  login(){
    console.log(this.loginForm.value);
    // this.api.saveTask(this.loginForm.value).subscribe((res)=>{
    //   alert(JSON.stringify(res));
    //   console.log(res);
    // })
  }

}
