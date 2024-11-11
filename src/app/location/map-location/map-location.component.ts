import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

declare const OlaMapsSDK: any;

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrl: './map-location.component.css',
})
export class MapLocationComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnInit(): void {
    setTimeout(() => {
      this.initializeMap();
    }, 1500);
  }
  ngAfterViewInit(): void {}
  private olaMaps: any;
  private myMap: any;

  private initializeMap(): void {
    try {
      this.olaMaps = new OlaMapsSDK.OlaMaps({
        apiKey: '',
      });

      this.myMap = this.olaMaps.init({
        style:
          'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
        container: 'map',
        center: [77.61648476788898, 12.931423492103944],
        zoom: 15,
       
      });

     


      this.myMap.on('load', () => {
        console.log('Map loaded Successfully');
      });

      this.addMarkers();

      this.addGeolocation();
     
      
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private addMarkers(): void {
    this.olaMaps
      .addMarker({ offset: [0, 30], anchor: 'bottom', color: "blue" })
      .setLngLat([18.6725, 78.0941])
      .addTo(this.myMap);

    this.olaMaps
      .addMarker({ offset: [0, 6], anchor: 'bottom', color: 'orange' })
      .setLngLat([77.61248476788898, 12.934223492103444])
      .addTo(this.myMap);

    this.olaMaps
      .addMarker({ offset: [0, 6], anchor: 'bottom', color: 'red' })
      .setLngLat([77.6196390456908, 12.93321052215299])
      .addTo(this.myMap);
  }

  private addGeolocation(): void {
    // Check if geolocation is supported in the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Center the map on the user's location
          this.myMap.setCenter([longitude, latitude]);
          this.myMap.setZoom(15);

          // Add a marker at the user's location
          this.olaMaps
            .addMarker({
              offset: [0, 0],
              anchor: 'center',
              color: 'green',
            })
            .setLngLat([longitude, latitude])
            .addTo(this.myMap);

          console.log('User location: ', latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }


  ngOnDestroy(): void {
    if (this.myMap) {
      this.myMap.remove();
    }
  }
}
