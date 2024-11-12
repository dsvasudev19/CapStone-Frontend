import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('auth');
    this.isLoggedIn = !!token;
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }

}
