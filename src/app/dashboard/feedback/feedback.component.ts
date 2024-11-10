import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit {
  private isLoading: boolean = false;
  showSuccessToast: boolean = false;
  showErrorToast: boolean = false;
  feedbacks: any[] = [
    {
      id: 1,
      userId: 101,
      serviceType: 'Carpool',
      serviceId: 201,
      rating: 5,
      comment: 'Great ride, very punctual!',
      timestamp: '2024-03-15T14:30:00',
    },
    {
      id: 2,
      userId: 102,
      serviceType: 'Bus',
      serviceId: 301,
      rating: 4,
      comment: 'Food was good but slightly delayed',
      timestamp: '2024-03-15T15:45:00',
    },
    {
      id: 3,
      userId: 103,
      serviceType: 'Carpool',
      serviceId: 202,
      rating: 5,
      comment: 'Very comfortable ride',
      timestamp: '2024-03-15T16:20:00',
    },
    {
      id: 4,
      userId: 104,
      serviceType: 'Bus',
      serviceId: 302,
      rating: 3,
      comment: 'Average service',
      timestamp: '2024-03-15T17:10:00',
    },
  ];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadAllFeedbacks()
  }

  loadAllFeedbacks(): any {
    this.isLoading=true
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        console.log('Success');
        this.feedbacks = data;
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        this.isLoading=false;
      }
    });
  }

  deleteFeedback(id:number):any{
    console.log("here in delete feedback")
    this.isLoading=true;
    
    this.feedbackService.deleteFeedbackById(id).subscribe({
      next:(data)=>{
        this.showSuccessToast=true;
        console.log("Successfully deleted the feedback")
      },
      error:(error)=>{
        console.log(error)
        this.showErrorToast=true;
      },
      complete:()=>{
        this.isLoading=false;
        setTimeout(()=>{
          this.showSuccessToast=false;
          this.showErrorToast=false;
        },1500)
      }
    })
  }

  getRatingClass(rating: number): string {
    switch (rating) {
      case 5:
        return 'text-green-600';
      case 4:
        return 'text-blue-600';
      case 3:
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  }


  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
