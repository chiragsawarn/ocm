import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-in-network',
  templateUrl: './in-network.component.html',
  styleUrls: ['./in-network.component.css']
})
export class InNetworkComponent implements OnInit {
  allProvidersData:any = [];
  specializations:any = new Set();
  constructor(private api:ApiService) { }

  
  
  findAllNetworkProviders(){
    
    const networkId = JSON.parse(localStorage.getItem('patientData')).INSURANCE.NETWORK;
    this.api.inNetwork(networkId).subscribe((res)=>{
      this.allProvidersData = res;
      // alert(JSON.stringify(res,null,4));
      this.allProvidersData.forEach(provider => {
        this.specializations.add(provider.SPECIALITY);
      }); 
      // alert(JSON.stringify(Array.from(this.specializations.values()),null,4))
    })
  }

  ngOnInit(): void {
    this.findAllNetworkProviders();
    // this.findAllEncounters();
  }

}
