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
  isOpen = false;
  currentStep = 0;
  insideBus: boolean | null = null;
  nextStop = '';
  location: { latitude: number; longitude: number } | null = null;
  hasAsked = false;

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

    const asked = sessionStorage.getItem("asked") === "true";
    this.hasAsked = asked;
    if (!asked) {
      this.isOpen = true;
    }
    this.getCurrentLocation();
  }

  onSearch(): void {
    this.routeService.findRouteBasedOnSourceAndDestination(this.searchForm.value.source,this.searchForm.value.destination).subscribe({
      next:(data)=>{
        console.log(data)
        if(data.length>0){
          this.filteredBuses=this.filteredBuses.filter((f:any)=>f.routeId!=data[0])
          console.log(this.filteredBuses)
        }else{
          this.filteredBuses=[]
        }
        
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{

      }
    })
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

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            resolve(this.location);  // Resolve the promise with location data
          },
          (error) => {
            console.error("Error getting location:", error);
            reject(error);  // Reject the promise on error
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  async sendRealTimeData(latitude: number, longitude: number) {
    try {
      const data = {
        busId:this.selectedBus.id,
        insideBus: this.insideBus,
        nextStop: this.nextStop,
        latitude,
        longitude,
        timestamp: new Date().toISOString()
      };
      console.log(data)
      // const response = await this.http.post('/api/realtime-data', data).toPromise();
      sessionStorage.setItem("asked", "true");
      this.hasAsked = true;
      this.isOpen = false;
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  handleAnswer(answer: boolean) {
    this.insideBus = answer;
    if (answer) {
      this.currentStep = 1;
    } else {
      this.getCurrentLocation();
      this.currentStep = 2;
    }
  }

  async handleNextStop() {
    if (this.nextStop.trim()) {
      this.currentStep = 2;
  
      try {
        await this.getCurrentLocation();
  
        const data = { ...this.location, nextStop: this.nextStop };
  
        this.busService.postLiveLocationOfBus(this.selectedBus.id, data).subscribe({
          next: (data) => {
            console.log("Successfully updated the data");
          },
          error: (error) => {
            console.log("Error updating the data:", error);
          }
        });
      } catch (error) {
        console.error("Error in getting location or posting live location:", error);
      }
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

  redirectToLiveTracking() {
    const url = `https://SmartTransit-livetracking.vercel.app?bus=${this.selectedBus.id}&status=live_tracking`;
    window.open(url, '_blank');  
  }
}
