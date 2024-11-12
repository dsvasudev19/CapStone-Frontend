import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CarpoolComponent } from './carpool/carpool.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BusSearchComponent } from './bus-search/bus-search.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { BusScheduleComponent } from './bus-schedule/bus-schedule.component';
import { LucideAngularModule ,Home,MapPin ,Clock,ChevronDown,ChevronUp,Map,MapPinned   } from 'lucide-angular';
import { LocationModule } from '../location/location.module';
@NgModule({
  declarations: [
    HomeComponent,
    CarpoolComponent,
    BusSearchComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    BusScheduleComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocationModule,
    LucideAngularModule.pick({Home,MapPin,Clock,ChevronDown,ChevronUp,Map,MapPinned    })
    
  ]
})
export class UserappModule { }
