import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';

interface MetricCard {
  title: string;
  value: number;
  icon: string;
  trend: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  // dashboard.component.ts

  @ViewChild('userChart') userChartCanvas!: ElementRef;
  @ViewChild('busChart') busChartCanvas!: ElementRef;

  userChart: Chart | undefined;
  busChart: Chart | undefined;

  totalUsers: number = 0;
  totalRoutes: number = 0;
  totalBuses: number = 0;
  bookingsCount:number = 0;
  registrationData: any = [];
  isLoading: boolean = false;

  metrics: MetricCard[] = [
    {
      title: 'Total Users',
      value: this.totalUsers,
      icon: 'fas fa-users',
      trend: 12.5,
    },
    {
      title: 'Available Buses',
      value: this.totalBuses,
      icon: 'fas fa-bus',
      trend: 8.2,
    },
    {
      title: 'Active Routes',
      value: this.totalRoutes,
      icon: 'fas fa-route',
      trend: -2.4,
    },
    {
      title: 'Bookings',
      value: this.bookingsCount,
      icon: 'fas fa-ticket-alt',
      trend: 15.7,
    },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('in init');
    this.getAllActiveRoutesCount();
    this.getAllOperatingBusesCount();
    this.getCountOfUserRegistration();
    this.getAllCarPoolBookingsCounts();
    this.getRegistrationAnalyticsOfTheYear();
  }

  getAllActiveRoutesCount(): any {
    this.isLoading = true;
    this.dashboardService.getActiveRoutesCount().subscribe({
      next: (data) => {
        this.metrics[2].value = data;
        this.totalRoutes = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  getAllOperatingBusesCount(): any {
    this.isLoading = true;
    this.dashboardService.getOperatingBusesCount().subscribe({
      next: (data) => {
        this.metrics[1].value = data;
        this.totalBuses = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getCountOfUserRegistration(): any {
    this.isLoading = true;

    this.dashboardService.getActiveUsersCount().subscribe({
      next: (data) => {
        this.metrics[0].value = data;
        this.totalUsers = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getRegistrationAnalyticsOfTheYear(): any {
    this.isLoading = true;
    this.dashboardService.getRegistrationsDataForTheYear().subscribe({
      next: (data) => {
        console.log(data)
        if (typeof window !== 'undefined') {
          this.initUserChart(data);
        }
        
        this.registrationData = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getAllCarPoolBookingsCounts(): any {
    this.isLoading = true;
    this.dashboardService.getCarPoolBookingsCount().subscribe({
      next: (data) => {
        this.metrics[3].value = data
        this.bookingsCount = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      // this.initUserChart(this.registrationData);
      this.initBusChart();
    }
  }

  initUserChart(registrationData: any) {
    const ctx = this.userChartCanvas.nativeElement.getContext('2d');
    this.userChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'New Users',
            data: registrationData,
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }

  initBusChart() {
    const ctx = this.busChartCanvas.nativeElement.getContext('2d');
    this.busChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Bus Utilization',
            data: [85, 92, 88, 95, 90, 75, 70],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }

  // Clean up charts when component is destroyed
  ngOnDestroy() {
    if (this.userChart) {
      this.userChart.destroy();
    }
    if (this.busChart) {
      this.busChart.destroy();
    }
  }
}
