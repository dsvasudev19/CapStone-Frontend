import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Map } from 'maplibre-gl';
import MapLibreGlDirections, {
  LoadingIndicatorControl,
} from '@maplibre/maplibre-gl-directions';
import { NavigationControl, Marker } from 'maplibre-gl';

@Component({
  selector: 'app-test-map',
  templateUrl: './test-map.component.html',
  styleUrl: './test-map.component.css',
})
export class TestMapComponent implements OnInit, OnDestroy {
  private map: any = null;
  private directions: MapLibreGlDirections | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Cleanup on destroy
    }
  }

  private initializeMap(): void {
    this.map = new Map({
      container: this.el.nativeElement.querySelector('#central-map'),
      style:
        'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
      center: [0, 0],
      zoom: 0,
      transformRequest: (
        url: string,
        resourceType: maplibregl.ResourceType | undefined
      ) => {
        // Replace the wrong URL with the correct one
        url = url.replace('app.olamaps.io', 'api.olamaps.io');

        // Add the API key to the URL based on existing parameters
        if (url.includes('?')) {
          url = url + '&api_key=CoX9oENjiQuISlA9j8X7rQhy9SmrwpuCZotfvRdy';
        } else {
          url = url + '?api_key=CoX9oENjiQuISlA9j8X7rQhy9SmrwpuCZotfvRdy';
        }
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: true,
      showCompass: true,
    });

    this.map.addControl(nav, 'top-left');

    // Add a marker at the specified coordinates

    console.log(this.map);
    // Map click event to fly to a specific feature
    this.map.on('click', 'symbols', (e: any) => {
      this.map?.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });

    // Add a default marker
    new Marker().setLngLat([77.5353394, 16.03106]).addTo(this.map);

    // Add a red marker to the map at a different location
    new Marker({
      color: 'red', // You can also use a custom icon or image
    })
      .setLngLat([77.5353394, 17.03106])
      .addTo(this.map);

    this.map.on('load', () => {
      // Create an instance of the default directions class

      new Marker().setLngLat([77.5353394, 16.03106]).addTo(this.map);


      if (this.map) {
        this.directions = new MapLibreGlDirections(this.map);
      }
      // Enable interactivity (if needed)
      if (this.directions) {
        this.directions.interactive = true;
        this.map?.addControl(new LoadingIndicatorControl(this.directions));
      }

      // Set the waypoints programmatically
      this.setWaypoints();

      // Example of adding and removing waypoints
      this.addAndRemoveWaypoints();
    });
  }

  private setWaypoints(): void {
    if (this.directions) {
      this.directions.setWaypoints([
        [77.5353394, 13.03106],
        [77.5353394, 15.03106],
      ]);
    }
  }

  private addAndRemoveWaypoints(): void {
    if (this.directions) {
      // Remove the first waypoint
      this.directions.removeWaypoint(0);

      // Add a new waypoint at a specified position
      this.directions.addWaypoint([-73.8671258, 40.82234996], 0);

      // Remove all directions-related elements from the map
      this.directions.clear();
    }
  }
}
