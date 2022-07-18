import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pcp',
  templateUrl: './pcp.component.html',
  styleUrls: ['./pcp.component.css']
})
export class PcpComponent implements OnInit {

  currentDay = 0;
  decrementCurrentDay(){
    if(this.currentDay > 0) --this.currentDay;
  }
  incrementCurrentDay(){
    if(this.currentDay < 6) ++this.currentDay;
  }
  patientData:any = JSON.parse(localStorage.getItem('patientData'));
  providerData:any;
  encounters:any = [];
  unavailableSlots:any = new Set();
  moment:any = moment;
  availableSlots = {
    0:[],
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[]
  };

  roundSeconds(timestamp){
    return moment.utc(timestamp).seconds(0).milliseconds(0).toISOString();

  }
  roundTimeQuarterHour() {
      var timeToReturn = new Date(Date.now());

      timeToReturn.setMilliseconds(Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000);
      timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
      timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 15) * 15);
      return this.roundSeconds(timeToReturn)
  }

  findUnavailableSlots = (today)=>{
    this.unavailableSlots.clear();
    this.encounters.forEach(encounter => {
      if(encounter.START > today){
        this.unavailableSlots.add(encounter.START);
      }
    });
    const iterator1 = this.unavailableSlots.values();
    console.log("Unavailable : ",iterator1.next().value);
    console.log("Unavailable : ",iterator1.next().value);
    // alert(JSON.stringify(this.unavailableSlots,null,4));
  }
  
  findAvailableSlots = ()=>{
    // clearing array every time fn is called
    this.availableSlots = {
      0:[],
      1:[],
      2:[],
      3:[],
      4:[],
      5:[],
      6:[]
    };
    var today = this.roundTimeQuarterHour();
    var todayAt9 = this.roundSeconds(moment(new Date()).set({hour: 9, minute: 0}).toDate().toISOString());
    var todayAt18 = this.roundSeconds(moment(new Date()).set({hour: 18, minute: 0}).toDate().toISOString());
    var originalTodayAt18 = todayAt18;
    if(today < todayAt9) today = todayAt9;

    this.findUnavailableSlots(today);

    
    for(let i=0; i<7; ++i){
      const availableSlotsToday = new Array();
      while(today < todayAt18){
        console.log(this.unavailableSlots.has(today), today);
        if(!this.unavailableSlots.has(today)){

          availableSlotsToday.push(today);
        }
        today = moment(today).add(15, 'm').toDate().toISOString();
      }
      this.availableSlots[i].push(...availableSlotsToday);
      today = new Date(new Date(todayAt9).getTime() + 86400000*(i+1)).toISOString();
      todayAt18 = new Date(new Date(originalTodayAt18).getTime() + 86400000*(i+1)).toISOString();
    }    
  }

  book = (slot)=>{
    const bookingDetails = {
      START:slot,
      END:moment(slot).add(15, 'm').toDate().toISOString(),
      PROVIDER:this.providerData._id,
      PATIENT:this.patientData._id
    }
    this.api.bookSlot(bookingDetails).subscribe((res)=>{
      alert(JSON.stringify(res,null,4));
      if(res){
        this.findEncounters();
      }
    });
  }

  findEncounters = ()=>{
    const providerId = this.patientData.INSURANCE.PCP._id;
    this.providerData = this.patientData.INSURANCE.PCP;
    // alert(JSON.stringify(this.providerData,null,4));
    this.api.pcp(providerId).subscribe((res)=>{
      this.encounters = res;
      this.findAvailableSlots();
      // alert(JSON.stringify(this.availableSlots,null,4));
    });
  }

  constructor(private api:ApiService) { }
  
  ngOnInit(): void {
    this.findEncounters();
  }
}
