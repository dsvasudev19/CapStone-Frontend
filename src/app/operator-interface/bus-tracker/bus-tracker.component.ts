import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { LiveTrackingService } from '../../services/live-tracking.service';

@Component({
  selector: 'app-bus-tracker',
  templateUrl: './bus-tracker.component.html',
  styleUrls: ['./bus-tracker.component.css'],
})
export class BusTrackerComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  buses = [{ id: 101 }, { id: 201 }, { id: 301 }];

  selectedBusNumber!: number;
  latitude!: number;
  longitude!: number;
  occupancy!: number;

  private intervalId: any;
  private geolocationId: number | null = null;

  constructor(
    private router: Router,
    private busService: BusService,
    private liveTrackingService: LiveTrackingService
  ) {}
  ngOnInit() {
    this.getAllBuses();
  }

  getAllBuses(): any {
    this.busService.getAllBuses().subscribe({
      next: (data) => {
        this.buses = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  startJourney() {
    // Start sending live location and occupancy data every 30 seconds
    this.intervalId = setInterval(() => {
      this.watchGeolocation();
      setTimeout(() => {
        this.sendLiveData();
      }, 10000);
    }, 20000);
  }

  sendLiveData() {
    // Generate random occupancy between 15% and 50%
    this.occupancy = this.getRandomNumber(15, 50);

    console.log(
      `Bus ${this.selectedBusNumber} - Latitude: ${this.latitude}, Longitude: ${this.longitude}, Occupancy: ${this.occupancy}%`
    );
    this.liveTrackingService
      .postLiveLocation(this.selectedBusNumber, {
        latitude: this.latitude,
        longitude: this.longitude,
        occupancy: this.occupancy,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  watchGeolocation() {
    if (navigator.geolocation) {
      this.geolocationId = navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);

    // Stop watching for geolocation updates
    if (this.geolocationId !== null) {
      navigator.geolocation.clearWatch(this.geolocationId);
    }
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }
}
