import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarpoolService } from '../../services/carpool.service';
import { RouteService } from '../../services/route.service';
import { UserService } from '../../services/user.service';
export interface CarPool {
  id: number;
  driverId: number;
  routeId: number;
  capacity: number;
  availableSeats: number;
  departureTime: string;
  pickupLocation: string;
  carpoolUsers: CarPoolUser[];
}

export interface CarPoolUser {
  id: number;
  userId: number;
  requestTime: string;
  carpool: any;
}
@Component({
  selector: 'app-carpool',
  templateUrl: './carpool.component.html',
  styleUrl: './carpool.component.css',
})
export class CarpoolComponent implements OnInit {
  isLoading: boolean = false;

  routes: any = [];

  users: any = [];

  showSuccessToast: boolean = false;

  showErrorToast: boolean = false;

  carpools: any[] = [
    {
      id: 1,
      driverId: 101,
      routeId: 201,
      capacity: 4,
      availableSeats: 2,
      departureTime: '09:00 AM',
      pickupLocation: 'Central Station',
    },
    {
      id: 2,
      driverId: 102,
      routeId: 202,
      capacity: 3,
      availableSeats: 1,
      departureTime: '10:30 AM',
      pickupLocation: 'Airport Terminal',
    },
  ];

  constructor(
    private carPoolService: CarpoolService,
    private routeService: RouteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllCarPoolServicesAlongWithUsersAndRoutes();
  }

  getAllCarPoolServicesAlongWithUsersAndRoutes(): any {
    this.routeService.getAllRoutes().subscribe({
      next: (routes) => {
        this.routes = routes;

        this.userService.getAllUsers().subscribe({
          next: (users) => {
            console.log(users);
            this.users = users;

            this.carPoolService.getAllCarPoolServices().subscribe({
              next: (carPools) => {
                let newCarPoolObjects = carPools.map((carPool: any) => {
                  let userId = carPool.driverId;
                  let routeId = carPool.routeId;

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

  getAllCarPoolServices(): any {
    this.isLoading = true;
    this.carPoolService.getAllCarPoolServices().subscribe({
      next: (data) => {
        console.log(data);
        console.log('Success');
        this.carpools = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onEdit(id: number): void {
    console.log('Edit carpool:', id);
  }

  onDelete(id: number): void {
    this.isLoading = true;
    this.carPoolService.deleteCarPoolService(id).subscribe({
      next: (data) => {
        console.log(data);
        console.log('Successfully deleted the CarPoolSerivce');
        this.showSuccessToast = true;
      },
      error: (error) => {
        console.log(error);
        this.showErrorToast = true;
      },
      complete: () => {
        this.isLoading = false;
        this.getAllCarPoolServicesAlongWithUsersAndRoutes();
        setTimeout(() => {
          this.showErrorToast = false;
          this.showSuccessToast = false;
        }, 1500);
      },
    });
  }
}
