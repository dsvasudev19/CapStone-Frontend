import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLocationComponent } from './map-location/map-location.component';



@NgModule({
  declarations: [
    MapLocationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MapLocationComponent
  ]
})
export class LocationModule { }
