import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { BusService } from '../../services/bus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css',
})
export class BusComponent implements OnInit {
  buses: any = [
    {
      id: 1,
      routeId: 101,
      capacity: 45,
      status: 'ACTIVE',
      realTimeData: [],
      busSchedules: [
        {
          id: 1,
          routeId: 101,
          departureTime: '2024-11-06T13:00:00',
          destinationArrivalTime: '2024-11-06T14:00:00',
          operatingStatus: true,
        },
        {
          id: 2,
          routeId: 101,
          departureTime: '2024-11-06T15:00:00',
          destinationArrivalTime: '2024-11-06T16:00:00',
          operatingStatus: true,
        },
      ],
    },
    {
      id: 2,
      routeId: 102,
      capacity: 50,
      status: 'ACTIVE',
      realTimeData: [],
      busSchedules: [
        {
          id: 3,
          routeId: 102,
          departureTime: '2024-11-06T14:00:00',
          destinationArrivalTime: '2024-11-06T15:00:00',
          operatingStatus: true,
        },
      ],
    },
    {
      id: 3,
      routeId: 103,
      capacity: 40,
      status: 'MAINTENANCE',
      realTimeData: [],
      busSchedules: [
        {
          id: 4,
          routeId: 103,
          departureTime: '2024-11-07T00:00:00',
          destinationArrivalTime: '2024-11-07T01:00:00',
          operatingStatus: false,
        },
        {
          id: 5,
          routeId: 103,
          departureTime: '2024-11-07T02:00:00',
          destinationArrivalTime: '2024-11-07T03:00:00',
          operatingStatus: false,
        },
      ],
    },
    {
      id: 4,
      routeId: 104,
      capacity: 55,
      status: 'ACTIVE',
      realTimeData: [],
      busSchedules: [
        {
          id: 6,
          routeId: 104,
          departureTime: '2024-11-07T12:00:00',
          destinationArrivalTime: '2024-11-07T13:00:00',
          operatingStatus: true,
        },
        {
          id: 7,
          routeId: 104,
          departureTime: '2024-11-07T14:00:00',
          destinationArrivalTime: '2024-11-07T15:00:00',
          operatingStatus: true,
        },
      ],
    },
  ];

  showSuccessToast: boolean = false;

  showErrorToast: boolean = false;

  showModal = false;

  busForm: FormGroup;

  submitting = false;

  routes: any = [];

  showScheduleModal = false;

  scheduleForm: FormGroup;

  selectedBusId!: number;

  loading: boolean = false;
  
  constructor(
    private busService: BusService,
    private routeService: RouteService,
    private fb: FormBuilder
  ) {
    this.busForm = this.fb.group({
      routeId: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
    });

    this.scheduleForm = this.fb.group({
      routeId: ['', Validators.required],
      departureTime: ['', Validators.required],
      destinationArrivalTime: ['', Validators.required],
      operatingStatus: [false],
    });
  }
  ngOnInit(): void {
    this.getAllRoutesAndBuses();
  }

  getAllRoutesAndBuses(): void {
    this.routeService.getAllRoutes().subscribe({
      next: (routes) => {
        console.log(routes);
        this.routes = routes;
        this.busService.getAllBuses().subscribe({
          next: (buses) => {
            let newBusesObjects = buses.map((bus: any) => {
              let routeFound = routes.find(
                (route: any) => route.id === bus.routeId
              );
              bus.route = routeFound;
              return bus;
            });
            this.buses = newBusesObjects;
            console.log(newBusesObjects);
          },
        });
      },
    });
  }
  getAllBuses(): void {
    this.loading = true;
    this.busService.getAllBuses().subscribe({
      next: (data) => {
        console.log(data);
        this.buses = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteBus(id: number): void {
    this.loading = true;
    this.busService.deleteBusById(id).subscribe({
      next: (data) => {
        this.showSuccessToast = true;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.showErrorToast = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.getAllRoutesAndBuses();
        setTimeout(() => {
          this.showErrorToast = false;
          this.showSuccessToast = false;
        }, 1500);
      },
    });
  }

  openModal() {
    this.showModal = true;
    this.busForm.reset();
  }

  closeModal() {
    this.showModal = false;
    this.busForm.reset();
  }

  onSubmit() {
    if (this.busForm.valid) {
      this.submitting = true;

      this.busService.addNewBus(this.busForm.value).subscribe({
        next: (response) => {
          this.closeModal();
          this.showSuccessToast = true;
        },
        error: (error) => {
          console.error('Error adding bus:', error);
          this.showErrorToast = true;
        },
        complete: () => {
          this.submitting = false;
          this.getAllRoutesAndBuses();
          setTimeout(() => {
            this.showErrorToast = false;
            this.showSuccessToast = false;
          }, 1500);
        },
      });
    }
  }

  openScheduleModal(id: number) {
    this.selectedBusId = id;
    this.showScheduleModal = true;
    this.scheduleForm.reset();
  }

  closeScheduleModal() {
    this.showScheduleModal = false;
    this.scheduleForm.reset();
  }

  onScheduleSubmit() {
    if (this.scheduleForm.valid) {
      const scheduleData = {
        ...this.scheduleForm.value,
        routeId: parseInt(this.scheduleForm.value.routeId),
      };

      this.busService
        .addScheduleToBus(this.selectedBusId, scheduleData)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.closeScheduleModal();
            this.showSuccessToast = true;
          },
          error: (error) => {
            console.log(error);
          },

          complete: () => {
            this.getAllRoutesAndBuses();
            setTimeout(() => {
              this.showErrorToast = false;
              this.showSuccessToast = false;
            }, 1500);
          },
        });
    }
  }
}
