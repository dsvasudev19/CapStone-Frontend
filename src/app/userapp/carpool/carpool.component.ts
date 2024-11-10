import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carpool',
  templateUrl: './carpool.component.html',
  styleUrl: './carpool.component.css'
})
export class CarpoolComponent {
  searchForm: FormGroup;
  isSearching = false;
  availableCarpools: any[] = [];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });

    // Mock data for carpool services
    this.availableCarpools = [
      {
        id: 1,
        driverName: 'John Doe',
        vehicle: 'Toyota Camry',
        departureTime: '08:00 AM',
        availableSeats: 3,
        price: 25,
        rating: 4.5
      },
      {
        id: 2,
        driverName: 'Jane Smith',
        vehicle: 'Honda Civic',
        departureTime: '09:30 AM',
        availableSeats: 2,
        price: 20,
        rating: 4.8
      },
      {
        id: 3,
        driverName: 'Mike Johnson',
        vehicle: 'Tesla Model 3',
        departureTime: '10:15 AM',
        availableSeats: 4,
        price: 30,
        rating: 4.7
      }
    ];
  }

  onSearch() {
    if (this.searchForm.valid) {
      this.isSearching = true;
      // Simulate API call
      setTimeout(() => {
        this.isSearching = false;
      }, 2000);
    }
  }

  bookRide(carpoolId: number) {
    const carpool = this.availableCarpools.find(c => c.id === carpoolId);
    if (carpool && carpool.availableSeats > 0) {
      carpool.availableSeats--;
      alert('Ride booked successfully!');
    }
  }

  getRatingStars(rating: number): string[] {
    return Array(Math.floor(rating)).fill('★').concat(Array(5 - Math.floor(rating)).fill('☆'));
  }

}
