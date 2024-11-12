import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { CarpoolService } from '../../services/carpool.service';
import { RouteService } from '../../services/route.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-carpool',
  templateUrl: './carpool.component.html',
  styleUrl: './carpool.component.css'
})
export class CarpoolComponent implements OnInit {
  searchForm: FormGroup;

  isSearching = false;

  availableCarpools: any[] = [];

  isLoading: boolean = false;

  routes: any = [];

  users: any = [];

  showSuccessToast: boolean = false;

  showErrorToast: boolean = false;

  carpools:any = [];

  filteredCarPools:any=[]

  isAuthenticated:boolean = false;

  constructor(private router:Router,private fb: FormBuilder,private routeService:RouteService,private carPoolService:CarpoolService,private userService:UserService,private authService:AuthenticationService) {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });

    this.availableCarpools = [
      {
        id: 1,
        driverName: 'John Doe',
        vehicle: 'Toyota Camry',
        departureTime: '08:00 AM',
        availableSeats: 3,
        price: 25,
        rating: 4.5
      },
      {
        id: 2,
        driverName: 'Jane Smith',
        vehicle: 'Honda Civic',
        departureTime: '09:30 AM',
        availableSeats: 2,
        price: 20,
        rating: 4.8
      },
      {
        id: 3,
        driverName: 'Mike Johnson',
        vehicle: 'Tesla Model 3',
        departureTime: '10:15 AM',
        availableSeats: 4,
        price: 30,
        rating: 4.7
      }
    ];
  }
  ngOnInit(): void {
    let isLoggedIn=sessionStorage.getItem("isAuthentication")
    if(isLoggedIn!==null && isLoggedIn){
      this.isAuthenticated=true;
    }
    this.getAllCarPoolServicesAlongWithUsersAndRoutes();
  }

  getRandomRating(){
    return Math.random() * (5 - 3) + 3;
  }
  

  onSearch() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value)
      this.isSearching = true;
      this.routeService.findRouteBasedOnSourceAndDestination(this.searchForm.value.source,this.searchForm.value.destination).subscribe({
        next:(data)=>{
          console.log(data)
          this.filteredCarPools=this.filteredCarPools.filter((f:any)=>f.routeId!=data[0])
          console.log(this.filteredCarPools)
        },
        error:(error)=>{
          console.log(error)
        },
        complete:()=>{

        }
      })
      setTimeout(() => {
        this.isSearching = false;
      }, 2000);
    }
  }

  getAllCarPoolServicesAlongWithUsersAndRoutes(): any {
    this.routeService.getAllRoutes().subscribe({
      next: (routes) => {
        this.routes = routes;
        console.log(routes);
        this.userService.getAllUsers().subscribe({
          next: (users) => {
            console.log(users);
            this.users = users;

            this.carPoolService.getAllCarPoolServices().subscribe({
              next: (carPools) => {
                let newCarPoolObjects = carPools.map((carPool: any) => {
                  let userId = carPool.driverId;
                  let routeId = carPool.routeId;
                  console.log(routeId)
                  let userFound = this.users.find(
                    (user: any) => user.id === userId
                  );
                  let routeFound = this.routes.find(
                    (route: any) => route.id === routeId
                  );
                  console.log(routeFound, userFound);
                  carPool.user = userFound;
                  carPool.route = routeFound;

                  return carPool;
                });

                console.log(newCarPoolObjects);

                this.carpools = newCarPoolObjects;
                this.filteredCarPools=newCarPoolObjects;
              },
              error: (error) => {
                console.error('Error fetching carpool services:', error);
              },
            });
          },
          error: (error) => {
            console.error('Error fetching users:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error fetching routes:', error);
      },
    });
  }



  bookRide(carpoolId: number) {
    const carpool = this.availableCarpools.find(c => c.id === carpoolId);
    if (carpool && carpool.availableSeats > 0) {
      const token=localStorage.getItem("auth")
      if(!token){
        alert("Please Login to Continue Booking")
        this.router.navigate(['/user/auth/login'])
      }
      this.authService.getUserByToken(token?token:"").subscribe({
        next:(data)=>{
          this.carPoolService.reserveASeatInCarPool(carpool.id,data.userId).subscribe({
            next:()=>{
              alert("Ride Booked Successfully")
            },
            error:(error)=>{
              console.log(error)
            },
            complete:()=>{
              this.getAllCarPoolServicesAlongWithUsersAndRoutes();
            }
          })
        }
      })
     
    }
  }

  getRatingStars(rating: number): string[] {
    return Array(Math.floor(rating)).fill('★').concat(Array(5 - Math.floor(rating)).fill('☆'));
  }

  navigateToProfile(){
    this.router.navigate(['/user/profile'])
  }

}
