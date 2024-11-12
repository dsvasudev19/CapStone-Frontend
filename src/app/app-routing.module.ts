import { AuthGuard } from './dashboard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BookingsComponent } from './dashboard/bookings/bookings.component';
import { BusComponent } from './dashboard/bus/bus.component';
import { CarpoolComponent } from './dashboard/carpool/carpool.component';
import { FeedbackComponent } from './dashboard/feedback/feedback.component';
import { HomeComponent } from './dashboard/home/home.component';
import { OperatorsComponent } from './dashboard/operators/operators.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { RoutesComponent } from './dashboard/routes/routes.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';

//userapp component
import { HomeComponent as UserAppHomeComponent } from './userapp/home/home.component';
import { CarpoolComponent as UserCarPoolComponent } from './userapp/carpool/carpool.component';
import { BusSearchComponent } from './userapp/bus-search/bus-search.component';
import { MapLocationComponent } from './location/map-location/map-location.component';
import { LocationMapComponent } from './location/location-map/location-map.component';
import { TestMapComponent } from './location/test-map/test-map.component';
import { LoginComponent as UserLoginComponent } from './userapp/auth/login/login.component';
import { RegisterComponent as UserRegisterComponent } from './userapp/auth/register/register.component';
import { ForgotPasswordComponent as UserForgotPasswordComponent } from './userapp/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent as UserResetPasswordComponent } from './userapp/auth/reset-password/reset-password.component';
import { ProfileComponent } from './userapp/profile/profile.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { UserGaurd } from './guards/user.guard';
import { BusScheduleComponent } from './userapp/bus-schedule/bus-schedule.component';
const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'operators', component: OperatorsComponent },
      { path: 'buses', component: BusComponent },
      { path: 'car-pool', component: CarpoolComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'feedbacks', component: FeedbackComponent },
      { path: 'routes', component: RoutesComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'user/auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'forgot-password', component: UserForgotPasswordComponent },
      { path: 'reset-password', component: UserResetPasswordComponent },
    ],
  },
  {
    path:'user',
    children:[
      {path:'profile',component:ProfileComponent,canActivate:[UserGaurd]}
    ]

  },
  {
    path: '',
    component: UserAppHomeComponent,
  },
  { path: 'carpool', component: UserCarPoolComponent },
  { path: 'bus-search', component: BusSearchComponent },
  { path: 'location', component: MapLocationComponent },
  { path: 'location2', component: LocationMapComponent },
  { path: 'test-location', component: TestMapComponent },
  { path:'bus-schedules',component:BusScheduleComponent},
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
