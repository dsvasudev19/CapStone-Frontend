import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      time: ['', Validators.required]
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

  ngOnInit(): void {}

  onSearch(): void {
    // Implement search logic
  }

  selectBus(bus: any): void {
    this.selectedBus = bus;
    this.showMap = true;
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
      default: return 'bg-gray-500';
    }
  }

  backToList(): void {
    this.selectedBus = null;
    this.showMap = false;
  }

}
