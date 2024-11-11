import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLocationComponent } from './map-location/map-location.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { TestMapComponent } from './test-map/test-map.component';



@NgModule({
  declarations: [
    MapLocationComponent,
    LocationMapComponent,
    TestMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LocationModule { }
