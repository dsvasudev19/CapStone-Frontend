import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrl: './bus-search.component.css'
})
export class BusSearchComponent {

  searchForm: FormGroup;
  availableBuses: any[] = [];
  selectedBus: any | null = null;
  showMap = false;
  isAuthenticated:boolean = false;
  buses:any=[];
  routes:any=[];
  filteredBuses:any=[]
  morningPeak:number=Math.floor(Math.random()*(99-40 +1)+40)
  afternoonPeak:number=Math.floor(Math.random()*(99-40 +1)+40)
  eveningPeak:number=Math.floor(Math.random()*(99-40 +1)+40)
  constructor(private fb: FormBuilder,private router:Router,private busService:BusService,private routeService:RouteService) {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
    });

    // Mock data for buses
    this.availableBuses = [
      {
        id: 1,
        routeNumber: "B101",
        routeName: "Downtown Express",
        startTime: "06:00 AM",
        endTime: "10:00 PM",
        currentLocation: { lat: 40.7128, lng: -74.0060 },
        nextStop: "Central Station",
        estimatedArrival: "5 mins",
        occupancy: 65,
        capacity: 100,
        status: "On Time",
        stops: ["Downtown", "Central Station", "North End", "Airport"],
        predictedOccupancy: {
          morning: 85,
          afternoon: 45,
          evening: 75
        }
      },
      {
        id: 2,
        routeNumber: "B102",
        routeName: "Airport Shuttle",
        startTime: "05:00 AM",
        endTime: "11:00 PM",
        currentLocation: { lat: 40.7306, lng: -73.9352 },
        nextStop: "Terminal 1",
        estimatedArrival: "2 mins",
        occupancy: 45,
        capacity: 100,
        status: "Arriving",
        stops: ["City Center", "Business District", "Airport Terminal 1", "Airport Terminal 2"],
        predictedOccupancy: {
          morning: 90,
          afternoon: 60,
          evening: 80
        }
      },
      // Add more mock buses as needed
    ];
    
  }

  ngOnInit(): void {
    let isLoggedIn=sessionStorage.getItem("isAuthentication")
    if(isLoggedIn!==null && isLoggedIn){
      this.isAuthenticated=true;
    }
    this.getAllRoutesAndBuses();
  }

  onSearch(): void {
    // Implement search logic
  }

  selectBus(bus: any): void {
    this.selectedBus = bus;
    this.showMap = true;
    console.log(this.selectedBus)
  }

  getAllRoutesAndBuses(): void {
    this.routeService.getAllRoutes().subscribe({
      next: (routes) => {
        console.log(routes);
        this.routes = routes;
        this.busService.getAllBuses().subscribe({
          next: (buses) => {
            let newBusesObjects = buses.map((bus: any) => {
              let routeFound = routes.find(
                (route: any) => route.id === bus.routeId
              );
              bus.route = routeFound;
              return bus;
            });
            this.buses = newBusesObjects;
            this.filteredBuses=newBusesObjects;
            console.log(newBusesObjects);
          },
        });
      },
    });
  }

  getAllBuses():any{
    this.busService.getAllBuses().subscribe({
      next:(data)=>{
        console.log(data)
        this.buses=data;
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{

      }
    })
  }

  getOccupancyColor(percentage: number): string {
    if (percentage < 50) return 'text-green-500';
    if (percentage < 80) return 'text-yellow-500';
    return 'text-red-500';
  }

  getOccupancyWidth(percentage: number): string {
    return `width: ${percentage}%`;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'On Time': return 'bg-green-500';
      case 'Delayed': return 'bg-red-500';
      case 'Arriving': return 'bg-blue-500';
      case 'Operating': return 'bg-orange-500';
      case 'Not Operating': return 'bg-violet-500'
      default: return 'bg-gray-500';
    }
  }

  backToList(): void {
    this.selectedBus = null;
    this.showMap = false;
  }

  navigateToProfile(){
    this.router.navigate(['/user/profile'])
  }

  getRandomNumber(){
    return Math.floor(Math.random() * (99 - 40 + 1)) + 35;
  }

}
