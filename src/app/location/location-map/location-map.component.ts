

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css'] // corrected this, it was 'styleUrl'
})
export class LocationMapComponent{

  map: any;
  locationError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  // Initialize Leaflet map
  initializeMap() {
    this.map = L.map('map').setView([0, 0], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Custom icons
    const userIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    const offsetIcon = L.icon({
      iconUrl: '/bus-lane.png',
      iconSize: [50, 75],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    // Function to calculate offset position
    const calculateOffsetPosition = (lat: number, lng: number, distance: number) => {
      // Earth's radius in meters
      const R = 6378137;

      // Convert distance to radians
      const d = distance / R;

      // Convert lat/lng to radians
      const lat1 = lat * Math.PI / 180;
      const lng1 = lng * Math.PI / 180;

      // Calculate new position (100m to the north-east)
      const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d) +
        Math.cos(lat1) * Math.sin(d) * Math.cos(Math.PI / 4)
      );

      const lng2 = lng1 + Math.atan2(
        Math.sin(Math.PI / 4) * Math.sin(d) * Math.cos(lat1),
        Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
      );

      // Convert back to degrees
      return {
        lat: lat2 * 180 / Math.PI,
        lng: lng2 * 180 / Math.PI
      };
    };

    // Get user's location and add markers
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Add user location marker
          const userMarker = L.marker([userLat, userLng], { icon: userIcon })
            .addTo(this.map)
            .bindPopup('Your Location');

          // Calculate offset position (100 meters away)
          const offsetPos = calculateOffsetPosition(userLat, userLng, 100);

          // Add offset marker
          const offsetMarker = L.marker([offsetPos.lat, offsetPos.lng], { icon: offsetIcon })
            .addTo(this.map)
            .bindPopup('100m Away');


          // Center map on user location
          this.map.setView([userLat, userLng], 17);

          // Add circle to show 100m radius
          const circle = L.circle([userLat, userLng], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.1,
            radius: 30
          }).addTo(this.map);
        },
        (error) => {
          this.locationError = true;
          console.error('Error getting location:', error);
        }
      );
    } else {
      this.locationError = true;
      console.error('Geolocation is not supported by this browser.');
    }
  }
 
  
}
