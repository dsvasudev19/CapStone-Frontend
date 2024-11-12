import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Stop {
  name: string;
  time: string;
}

export interface Route {
  name: string;
  origin: string;
  destination: string;
  stops: Stop[];
}

export interface Bus {
  routeId: number;
  capacity: number;
  status: string;
  route: Route;
}

export interface BusSchedule {
  id: number;
  departureTime: string;
  destinationArrivalTime: string;
  operatingStatus: boolean;
  bus: Bus;
}

@Component({
  selector: 'app-bus-schedule',
  templateUrl: './bus-schedule.component.html',
  styleUrl: './bus-schedule.component.css'
})
export class BusScheduleComponent implements OnInit {

  isAuthenticated:boolean = false;

  schedules = [
    {
      id: 1,
      departureTime: "08:00",
      destinationArrivalTime: "09:30",
      operatingStatus: true,
      bus: {
        routeId: 101,
        capacity: 45,
        status: "Active",
        route: {
          name: "Downtown Express",
          origin: "Central Station",
          destination: "Business District",
          stops: [
            { name: "Central Station", time: "08:00" },
            { name: "Market Square", time: "08:15" },
            { name: "Business District", time: "08:30" }
          ]
        }
      }
    }
  ];

  constructor(private router:Router){}
  ngOnInit(): void {
    let isLoggedIn=sessionStorage.getItem("isAuthentication")
    if(isLoggedIn!==null && isLoggedIn){
      this.isAuthenticated=true;
    }
  }

  navigateToProfile(){
    this.router.navigate(['/user/profile'])
  }

}
