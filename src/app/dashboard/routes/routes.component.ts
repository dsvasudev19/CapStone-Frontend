import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouteService } from '../../services/route.service';

export const DUMMY_ROUTES = [
  {
    id: 1,
    name: 'Miyapur To Koti',
    origin: 'Miyapur',
    destination: 'Koti',
    stops: [
      {
        id: 1,
        name: 'Chandanagar',
        latitude: 10.487,
        longitude: 9.93,
        route: null,
      },
      {
        id: 2,
        name: 'LalaGuda',
        latitude: 19.487,
        longitude: 90.93,
        route: null,
      },
    ],
    stations: [],
  },
  {
    id: 152,
    name: 'Patancheru To Koti',
    origin: 'Patancheru',
    destination: 'Koti',
    stops: [],
    stations: [],
  },
  {
    id: 202,
    name: 'Lingampally To Bowenpally',
    origin: 'Lingampally',
    destination: 'Bowenpally',
    stops: [
      {
        id: 202,
        name: 'Lingampally',
        latitude: 0.0,
        longitude: 0.0,
        route: null,
      },
      {
        id: 203,
        name: 'Bowenpally',
        latitude: 0.0,
        longitude: 0.0,
        route: null,
      },
    ],
    stations: [
      {
        id: 152,
        name: 'Miyapur Jn',
        latitude: 73.930489,
        longitude: 18.9309,
        route: null,
      },
    ],
  },
];

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css',
})
export class RoutesComponent implements OnInit {

  routes: any[] = [];

  expandedRoutes: boolean[] = [];

  isLoading: boolean = false;

  showSuccessToast: boolean = false;

  showErrorToast: boolean = false;

  showModal = false;

  routeForm: FormGroup;

  submitting = false;

  showAddStopModal = false;

  stopForm: FormGroup;

  currentRouteId !: number;

  showAddStationModal=false;

  stationForm:FormGroup;

  constructor(private routeService: RouteService, private fb: FormBuilder) {

    this.routeForm = this.fb.group({
      name: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
    });

    this.stopForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });

    this.stationForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit() {
    // this.routes = DUMMY_ROUTES;
    this.getAllRoutes();
    this.expandedRoutes = new Array(this.routes.length).fill(false);
  }

  toggleRouteDetails(index: number) {
    this.expandedRoutes[index] = !this.expandedRoutes[index];
  }

  getAllRoutes(): any {
    this.isLoading = true;
    this.routeService.getAllRoutes().subscribe({
      next: (data) => {
        console.log(data);
        this.routes = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  deleteRoute(id: number) {
    this.isLoading = true;
    console.log('Deleting route:', id);
    this.routeService.deleteRouteById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.showSuccessToast = true;
      },
      error: (error) => {
        console.log(error);
        this.showErrorToast = true;
      },
      complete: () => {
        this.isLoading = false;
        this.getAllRoutes();
        setTimeout(() => {
          this.showErrorToast = false;
          this.showSuccessToast = false;
        }, 1500);
      },
    });
  }

  getStopsCount(route: any): number {
    return route.stops.length;
  }

  getStationsCount(route: any): number {
    return route.stations.length;
  }

  openModal() {
    this.showModal = true;
    this.routeForm.reset();
  }

  closeModal() {
    this.showModal = false;
    this.routeForm.reset();
  }

  onSubmit() {
    if (this.routeForm.valid) {
      this.submitting = true;
      this.routeService.addNewRoute(this.routeForm.value).subscribe({
        next: (response) => {
          this.closeModal();
          this.showSuccessToast = true;
        },
        error: (error) => {
          console.error('Error adding route:', error);
          this.showErrorToast = true;
        },
        complete: () => {
          this.submitting = false;
          this.getAllRoutes();
          setTimeout(() => {
            this.showErrorToast = false;
            this.showSuccessToast = false;
          }, 1500);
        },
      });
    }
  }

  openAddStopModal(routeId: number) {
    this.currentRouteId = routeId;
    this.showAddStopModal = true;
    this.stopForm.reset();
  }

  closeAddStopModal() {
    this.showAddStopModal = false;
    this.stopForm.reset();
  }

  openAddStationModal(routeId: number) {
    this.currentRouteId = routeId;
    this.showAddStationModal = true;
    this.stationForm.reset();
  }

  closeAddStationModal() {
    this.showAddStationModal = false;
    this.stationForm.reset();
  }

  submitStation() {
    if (this.stationForm.valid && this.currentRouteId) {
      this.routeService.addStationToRoute(this.currentRouteId,this.stationForm.value).subscribe({
        next:(data)=>{
          console.log("Station Added Successfully")
          this.closeAddStationModal();
          this.showSuccessToast=true;
        },
        error:(error)=>{
          console.log(error)
          this.showErrorToast=true;
        },
        complete:()=>{
          this.getAllRoutes();
          setTimeout(()=>{
            this.showErrorToast=false;
            this.showSuccessToast=false;
          },1500)
        }
      })
    } 
  }

  submitStop() {
    this.routeService.addStopToRoute(this.currentRouteId,this.stopForm.value).subscribe({
      next:(data)=>{
        console.log("Successfully added the stop")
        this.closeAddStopModal();
        this.showSuccessToast=true;
      },
      error:(error)=>{
        this.showErrorToast=true;
      },
      complete:()=>{
        this.getAllRoutes();
        setTimeout(()=>{
          this.showSuccessToast=false;
          this.showErrorToast=false;
        },1500)
      }
    })
  }

}
