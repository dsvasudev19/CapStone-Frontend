import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CarpoolComponent } from './carpool/carpool.component';
import { BusComponent } from './bus/bus.component';
import { OperatorsComponent } from './operators/operators.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentComponent } from './payment/payment.component';
import { RoutesComponent } from './routes/routes.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    HomeComponent,
    BookingsComponent,
    CarpoolComponent,
    BusComponent,
    OperatorsComponent,
    FeedbackComponent,
    PaymentComponent,
    RoutesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
