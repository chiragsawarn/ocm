import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string;
  private corsHeaders: HttpHeaders;

  constructor(private http:HttpClient) { 
    this.url = 'http://localhost:3000/';
    this.corsHeaders = new HttpHeaders().set('access-control-allow-origin',this.url);
    
  }
  
  
  patientAuth(loginFormDetails){
    const endpoint = 'patientAuth/login';
    return this.http.post(this.url + endpoint, loginFormDetails);
  }
}
