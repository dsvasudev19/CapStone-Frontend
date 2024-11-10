import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CarpoolComponent } from './carpool/carpool.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BusSearchComponent } from './bus-search/bus-search.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarpoolComponent,
    BusSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class UserappModule { }
