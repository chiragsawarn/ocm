import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  
  pcp(providerId){
    const endpoint = 'encounter/ofProvider';
    const providerObj = {
      PROVIDER:providerId
    }
    return this.http.post(this.url + endpoint, providerObj);
  }
  
  bookSlot(bookingDetails){
    const endpoint = 'encounter/add';
    return this.http.post(this.url + endpoint, bookingDetails);
  }

  cancelSlot(encounterId, patientId, updatedEncountersOfPatient){
    const endpoint1 = 'encounter/' + encounterId;
    const endpoint2 = 'patient/' + patientId;

    this.http.patch(this.url + endpoint2, updatedEncountersOfPatient);
    return this.http.delete(this.url + endpoint1);
  }
  
  inNetwork(networkId){
    const endpoint = 'network/' + networkId;
    return this.http.get(this.url + endpoint);
  }

  viewAppointmentsPatient(patientId){
    const endpoint = 'patient/' + patientId + '/encounters';
    return this.http.get(this.url + endpoint);
  }
}
