import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  currentPath: string = '';

  isSideBarOpen: boolean = false;

  currentUser!:any;

  constructor(private router: Router,private authService:AuthenticationService) {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentPath = this.router.url;
    console.log(this.currentPath);

    const token=localStorage.getItem("__auth")
    if(token){
      this.getUserByToken(token);
    }
  }

  getUserByToken(token:string){
    this.authService.getUserByToken(token).subscribe({
      next:(data)=>{
        this.currentUser=data;
        console.log(data)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar-multi-level-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }
  menuItems = [
    { route: '/admin/dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { route: '/admin/users', icon: 'Users', label: 'Users' },
    {
      route: '/admin/car-pool',
      icon: 'CarTaxiFront',
      label: 'CarPool Services',
    },
    { route: '/admin/buses', icon: 'Bus', label: 'Bus Management' },
    // { route: '/admin/bookings', icon: 'TicketCheck', label: 'CarPool Bookings' },
    {
      route: '/admin/feedbacks',
      icon: 'MessageCircleHeart',
      label: 'User Feedbacks',
    },
    {
      route: '/admin/payment',
      icon: 'BadgeIndianRupee',
      label: 'CarPool Payments',
    },
    { route: '/admin/operators', icon: 'UserCog', label: 'Operators' },
    { route: '/admin/routes', icon: 'Route', label: 'Route Management' },
  ];

  logOut():any{
    localStorage.removeItem("__auth")
    this.router.navigate(['/auth/login'])
  }
}
