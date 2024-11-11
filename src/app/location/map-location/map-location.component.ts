// import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

// declare const OlaMapsSDK: any;

// @Component({
//   selector: 'app-map-location',
//   templateUrl: './map-location.component.html',
//   styleUrl: './map-location.component.css',
// })
// export class MapLocationComponent implements OnInit, AfterViewInit, OnDestroy {
//   ngOnInit(): void {
//     setTimeout(() => {
//       this.initializeMap();
//     }, 1500);
//   }
//   ngAfterViewInit(): void {}
//   private olaMaps: any;
//   private myMap: any;

//   private initializeMap(): void {
//     try {
//       this.olaMaps = new OlaMapsSDK.OlaMaps({
//         apiKey: 'CoX9oENjiQuISlA9j8X7rQhy9SmrwpuCZotfvRdy',
//       });

//       this.myMap = this.olaMaps.init({
//         style:
//           'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
//         container: 'map',
//         center: [77.61648476788898, 12.931423492103944],
//         zoom: 5 ,
       
//       });

  
//       this.myMap.on('load', () => {
//         console.log('Map loaded Successfully');
//       });

//       this.addMarkers();

//       this.addGeolocation();
     
      
//     } catch (error) {
//       console.error('Error initializing map:', error);
//     }
//   }

//   private addMarkers(): void {
//     this.olaMaps
//       .addMarker({ offset: [0, 0], anchor: 'bottom', color: "blue" })
//       .setLngLat([18.6725, 78.0941])
//       .addTo(this.myMap);

//     this.olaMaps
//       .addMarker({ offset: [0, 0], anchor: 'bottom', color: 'orange' })
//       .setLngLat([77.61248476788898, 12.934223492103444])
//       .addTo(this.myMap);

//     this.olaMaps
//       .addMarker({ offset: [0, 0], anchor: 'bottom', color: 'red' })
//       .setLngLat([77.6196390456908, 12.93321052215299])
//       .addTo(this.myMap);
//   }

//   private addGeolocation(): void {
//     // Check if geolocation is supported in the browser
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;

//           // Center the map on the user's location
//           this.myMap.setCenter([longitude, latitude]);
//           this.myMap.setZoom(15);

//           // Add a marker at the user's location
//           this.olaMaps
//             .addMarker({
//               offset: [0, 0],
//               anchor: 'center',
//               color: 'green',
//             })
//             .setLngLat([longitude, latitude])
//             .addTo(this.myMap);

//           console.log('User location: ', latitude, longitude);
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }


//   ngOnDestroy(): void {
//     if (this.myMap) {
//       this.myMap.remove();
//     }
//   }

 
// }

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

declare const OlaMapsSDK: any;

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrl: './map-location.component.css',
})
export class MapLocationComponent implements OnInit, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
   
  }
  private olaMaps: any;
  private myMap: any;
  private markers: any[] = [];
  private routeLayer: any = null;

  // Sample coordinates - replace these with your actual source and destination
  private sourceLocation = [77.61648476788898, 12.931423492103944]; // [longitude, latitude]
  private destinationLocation = [77.6196390456908, 12.93321052215299]; // [longitude, latitude]

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    try {
      this.olaMaps = new OlaMapsSDK.OlaMaps({
        apiKey: 'CoX9oENjiQuISlA9j8X7rQhy9SmrwpuCZotfvRdy',
      });

      this.myMap = this.olaMaps.init({
        style: 'https://api.olamaps.io/styleEditor/v1/styleEdit/styles/0eeb0df2-97bb-467a-b82d-0ed76b8bbc4b/capstone',
        container: 'map',
        center: this.sourceLocation, // Center on source location initially
        zoom: 13,
      });

      this.myMap.on('load', () => {
        console.log('Map loaded Successfully');
        this.addSourceDestinationMarkers();
        this.getDirections();
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private addSourceDestinationMarkers(): void {
    // Add source marker (green)
    const sourceMarker = this.olaMaps
      .addMarker({
        offset: [0, 0],
        anchor: 'bottom',
        color: 'green',
      })
      .setLngLat(this.sourceLocation)
      .addTo(this.myMap);

    // Add destination marker (red)
    const destinationMarker = this.olaMaps
      .addMarker({
        offset: [0, 0],
        anchor: 'bottom',
        color: 'red',
      })
      .setLngLat(this.destinationLocation)
      .addTo(this.myMap);

    this.markers.push(sourceMarker, destinationMarker);

    // Fit map to show both markers
    this.fitMapToBounds();
  }

  private async getDirections(): Promise<void> {
    try {
      // Create directions service instance
      const directionsService = this.olaMaps.directionsService;

      // Request parameters
      const requestParams = {
        source: this.sourceLocation,
        destination: this.destinationLocation,
        alternatives: false, // Set to true if you want alternative routes
        mode: 'car', // Available modes: 'car', 'bike', 'walk'
      };

      // Get directions
      const response = await directionsService.getDirections(requestParams);

      if (response && response.routes && response.routes.length > 0) {
        this.displayRoute(response.routes[0]);
      }
    } catch (error) {
      console.error('Error getting directions:', error);
    }
  }

  private displayRoute(route: any): void {
    // Remove existing route layer if it exists
    if (this.routeLayer) {
      this.myMap.removeLayer(this.routeLayer.id);
      this.myMap.removeSource(this.routeLayer.source);
    }

    // Add the route to the map
    const routeSource = {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route.geometry.coordinates
        }
      }
    };

    // Add source to map
    this.myMap.addSource('route', routeSource);

    // Add layer to map
    this.routeLayer = this.myMap.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#4285F4',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });

    // Add turn-by-turn instructions if available
    if (route.legs && route.legs[0] && route.legs[0].steps) {
      this.displayInstructions(route.legs[0].steps);
    }
  }

  private displayInstructions(steps: any[]): void {
    // You can implement this method to display turn-by-turn instructions
    // For example, you could emit these instructions to be displayed in your template
    console.log('Route Instructions:', steps);
  }

  private fitMapToBounds(): void {
    // Create a bounds object
    const bounds = new OlaMapsSDK.LngLatBounds()
      .extend(this.sourceLocation)
      .extend(this.destinationLocation);

    // Fit the map to show both points with padding
    this.myMap.fitBounds(bounds, {
      padding: 50
    });
  }

  ngOnDestroy(): void {
    // Clean up markers
    this.markers.forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
    
    // Clean up route layer
    if (this.routeLayer) {
      this.myMap.removeLayer(this.routeLayer.id);
      this.myMap.removeSource(this.routeLayer.source);
    }
    
    // Clean up map
    if (this.myMap) {
      this.myMap.remove();
    }
  }
}