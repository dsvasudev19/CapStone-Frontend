import { CarpoolService } from './../../services/carpool.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { AuthenticationService } from '../../auth/authentication.service';
import { NotificationService } from '../../services/notification.service';
import { RouteService } from '../../services/route.service';
import { UserService } from '../../services/user.service';

interface Reservation {
  type: string;
  route: string;
  time: string;
  status: string;
  statusClass: string;
}

interface Notification {
  message: string;
  time: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  showCarpoolModal = false;

  usageChart: any;

  isLoading:boolean = false;

  routes: any[] = [
    { id: 1, name: 'Route 1', startPoint: 'Downtown', endPoint: 'Suburbs' },
    { id: 2, name: 'Route 2', startPoint: 'North Station', endPoint: 'South Mall' },
    { id: 3, name: 'Route 3', startPoint: 'East Park', endPoint: 'West Market' },
  ];

  constructor(private routeService:RouteService,
    private authService:AuthenticationService,
    private router:Router,
    private userService:UserService,
    private notificationService:NotificationService,
    private carpoolService:CarpoolService
    ){}

  // Stats
  totalBusTrips = 120;
  totalCarpools = 35;
  totalFeedback = 24;
  carbonSaved = 285.5;
  isEditing = false;
  showPasswordModal = false;

  // Sample data
  recentReservations: Reservation[] = [
    {
      type: 'Carpool',
      route: 'Downtown to Uptown',
      time: 'Today at 9:00 AM',
      status: '4 seats available',
      statusClass: 'text-red-600 bg-red-100'
    },
    {
      type: 'Bus',
      route: 'Route 42 Express',
      time: 'Tomorrow at 8:30 AM',
      status: 'Confirmed',
      statusClass: 'text-green-600 bg-green-100'
    }
  ];

  notifications: any[] = [
    {
      message: 'Your carpool reservation has been confirmed.',
      time: '2 hours ago'
    },
    {
      message: 'New eco-rewards points added to your account!',
      time: '1 day ago'
    }
  ];

  newCarpoolService: any = {
    routeId: 0,
    capacity: 0,
    availableSeats: 0,
    departureTime: '',
    pickupLocation: ''
  };

  
  
  userData = {
    id:0,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900'
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  
  ngOnInit() {
    this.initializeChart();
    this.getAllRoutes();
    this.getUserDetails();
    
  }


  setEditMode() {
    this.isEditing = true;
  }

  getAllNotifications(userId:any):any{
    this.notificationService.getAllNotificationsOfUser(userId).subscribe({
      next:(data)=>{
        this.notifications=data;
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{

      }
    })
  }

  saveProfile() {
    this.userService.updateUserDetails(this.userData.id,this.userData).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{

      }
    })
    this.isEditing = false;
  }

  openPasswordModal() {
    this.showPasswordModal = true;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  changePassword() {
    console.log(this.passwordData)
    this.authService.changePassword(this.userData.email,this.passwordData).subscribe({
      next:(data)=>{
        console.log("Successfully changed the password")
        this.closePasswordModal();
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{

      }
    })
  }

  getUserDetails():any{
    const token=localStorage.getItem("auth")
    if(token){
      this.authService.getUserByToken(token).subscribe({
        next:(data)=>{
          this.userData=data;
          console.log(data)
          this.getAllNotifications(data.id);
        }
      })
    }else{
      this.router.navigate(['/user/auth/login'])
    }
  }

  getAllRoutes():any{
    this.routeService.getAllRoutes().subscribe({
      next:(data)=>{
        console.log(data)
        this.routes=data
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{

      }
    })
  }


  initializeChart() {
    const ctx = document.getElementById('usageChart') as HTMLCanvasElement;
    this.usageChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Bus Trips',
          data: [20, 25, 30, 45],
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1
        }, {
          label: 'Carpools',
          data: [5, 8, 10, 12],
          backgroundColor: 'rgba(239, 68, 68, 0.4)',
          borderColor: 'rgba(239, 68, 68, 0.8)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  toggleCarpoolModal() {
    this.showCarpoolModal = !this.showCarpoolModal;
  }

  submitCarpoolService() {
    // TODO: Implement service submission
    console.log('Submitting carpool service:', this.newCarpoolService);
    this.isLoading=true;
    if(this.newCarpoolService.routeId && 
      this.newCarpoolService.capacity && 
      this.newCarpoolService.availableSeats && 
      this.newCarpoolService.departureTime &&
      this.newCarpoolService.pickupLocation){
        this.carpoolService.addNewCarPoolService({...this.newCarpoolService,driverId:this.userData.id}).subscribe({
          next:(data)=>{
            console.log("Successfully Added the CarPoolService")
            this.toggleCarpoolModal();
          },
          error:(error)=>{
            console.log(error)
          },
          complete:()=>{
            this.isLoading=false;
          }
        })
      }
    
    
    // Reset form
    this.newCarpoolService = {
      routeId: 0,
      capacity: 0,
      availableSeats: 0,
      departureTime: '',
      pickupLocation: ''
    };
  }
  
}
