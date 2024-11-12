import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LucideAngularModule, File, Home, Menu, UserCheck,LayoutDashboard,UserCog,CarTaxiFront,TicketCheck,Bus, MessageCircleHeart,BadgeIndianRupee,Users,Settings2,Delete,Route } from 'lucide-angular';
import { UserappModule } from './userapp/userapp.module';
import { LocationModule } from './location/location.module';
import { BusTrackerComponent } from './operator-interface/bus-tracker/bus-tracker.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent,
    BusTrackerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    UserappModule,
    LocationModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({Delete, File, Home, Menu, UserCheck,LayoutDashboard,UserCog,CarTaxiFront,TicketCheck,Bus,MessageCircleHeart,BadgeIndianRupee,Users,Settings2,Route})
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
