import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  originalEncounters:any = [];
  encounters:any = [];
  moment:any = moment;

  constructor(private api:ApiService) { }

  filterUpcomingAppointments(res){
    this.encounters = [];
    const sortAppointments = ()=>{
      let compare = (a,b)=>{
        if ( a.START < b.START ){
          return -1;
        }
        if ( a.START > b.START ){
          return 1;
        }
        return 0;
      }
      this.encounters.sort(compare);
    }
    const roundSeconds = (timestamp)=>{
      return moment.utc(timestamp).seconds(0).milliseconds(0).toISOString();
  
    }
    const roundTimeQuarterHour = ()=>{
        var timeToReturn = new Date(Date.now());
  
        timeToReturn.setMilliseconds(Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000);
        timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
        timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 15) * 15);
        return roundSeconds(timeToReturn)
    }
    let today = roundTimeQuarterHour();
    for(let i=0; i<res.length; ++i){
      if(res[i].START >= today){
        this.encounters.push(res[i]);
      }
    }
  }

  findAllAppointments(){
    const patientId = JSON.parse(localStorage.getItem('patientData'))._id;
    this.api.viewAppointmentsPatient(patientId).subscribe((res:any)=>{
      this.originalEncounters = res;
      this.filterUpcomingAppointments(res);
      // alert(JSON.stringify(res,null,4));
    })
  }

  ngOnInit(): void {
    this.findAllAppointments();
  }
  
  cancel(encounter){
    const patientId = JSON.parse(localStorage.getItem('patientData'))._id;
    const idxToBeDeleted = this.originalEncounters.indexOf(encounter);
    console.log(idxToBeDeleted);
    const updatedEncountersOfPatient = {
      'ENCOUNTERS':this.originalEncounters.splice(idxToBeDeleted,1)
    }
    this.api.cancelSlot(encounter._id, patientId, updatedEncountersOfPatient).subscribe((res)=>{
      alert(JSON.stringify(res,null,4))
      this.findAllAppointments();
    })
  }

}
