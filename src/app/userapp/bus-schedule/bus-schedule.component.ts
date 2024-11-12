import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { RouteService } from '../../services/route.service';

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
  styleUrl: './bus-schedule.component.css',
})
export class BusScheduleComponent implements OnInit {
  isAuthenticated: boolean = false;

  routes: any = [];

  buses: any = [];

  isAccordionOpen: { [key: number]: boolean } = {};

  toggleAccordion(routeId: number): void {
    this.isAccordionOpen[routeId] = !this.isAccordionOpen[routeId];
  }

  constructor(
    private router: Router,
    private routeService: RouteService,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    let isLoggedIn = sessionStorage.getItem('isAuthentication');
    if (isLoggedIn !== null && isLoggedIn) {
      this.isAuthenticated = true;
    }
    this.getAllRoutesAndBusesAlongWithStopsAndSchedules();
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }

  getAllRoutesAndBusesAlongWithStopsAndSchedules(): any {
    this.routeService.getAllRoutes().subscribe({
      next: (routes) => {
        console.log(routes);
        this.routes = routes;
        this.busService.getAllBuses().subscribe({
          next: (buses) => {
            let newBusesObjects = buses.map((bus: any) => {
              let routeId = bus.routeId;
              let routeFound = this.routes.filter(
                (route: any) => route.id === routeId
              );
              bus.route = routeFound;
              return bus;
            });
            this.buses = newBusesObjects;
            console.log(newBusesObjects);
          },
        });
      },
    });
  }
}
