import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginFailed:Boolean = false;
  loginForm:FormGroup;
  userIdLabel:string = "User ID";

  // constructor(private fb:FormBuilder) { }
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

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
    function loginSuccessful(res){
      return Array.isArray(res) && res.length;
    }
    if(this.loginForm.value.type == 'patient'){
      this.loginForm.removeControl('type');
      console.log(this.loginForm.value);
      this.api.patientAuth(this.loginForm.value).subscribe((res)=>{
        if(!loginSuccessful(res)){
          this.loginFailed = true;
        }

      });
    }else if(this.loginForm.value.type == 'provider'){

    }
  }

}
