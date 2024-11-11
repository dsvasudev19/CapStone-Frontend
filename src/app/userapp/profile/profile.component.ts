import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userFeedback = [
    { content: 'Great service, thank you!', createdAt: new Date('2023-04-15') },
    { content: 'Could use more carpool options in my area.', createdAt: new Date('2023-03-28') },
    { content: 'The bus schedule is very reliable.', createdAt: new Date('2023-02-10') }
  ];

  userReservations = [
    {
      date: '2023-05-01',
      departure: 'Downtown',
      arrival: 'Uptown',
      createdAt: new Date('2023-04-28')
    },
    {
      date: '2023-04-20',
      departure: 'Suburbs',
      arrival: 'City Center',
      createdAt: new Date('2023-04-15')
    },
    {
      date: '2023-03-12',
      departure: 'East Side',
      arrival: 'West Side',
      createdAt: new Date('2023-03-10')
    }
  ];
  
}
