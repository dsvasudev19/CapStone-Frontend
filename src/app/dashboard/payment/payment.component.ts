import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  private isLoading:boolean=false;
  transactions: any[] = [
    {
      transactionId: 1,
      userId: 101,
      currency: "USD",
      amount: 99.99,
      status: "COMPLETED",
      orderId: "ORD-001",
      createdAt: "2024-03-15T14:30:00"
    },
    {
      transactionId: 2,
      userId: 102,
      currency: "EUR",
      amount: 149.99,
      status: "PENDING",
      orderId: "ORD-002",
      createdAt: "2024-03-15T15:45:00"
    },
    {
      transactionId: 3,
      userId: 103,
      currency: "USD",
      amount: 75.50,
      status: "COMPLETED",
      orderId: "ORD-003",
      createdAt: "2024-03-15T16:20:00"
    },
    {
      transactionId: 4,
      userId: 104,
      currency: "USD",
      amount: 199.99,
      status: "FAILED",
      orderId: "ORD-004",
      createdAt: "2024-03-15T17:10:00"
    }
  ];

  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void { 
    this.loadAllPaymentTransactions();
  }

  loadAllPaymentTransactions():any{
    this.isLoading=true;
    this.paymentService.getAllPaymentTransactions().subscribe({
      next:(data)=>{
        console.log("Success");
        this.transactions=data
        this.isLoading=false
      },
      error:(error)=>{
        console.log(error)
        this.isLoading=false
      },
      complete:()=>{
        console.log("executing complete block")
        this.isLoading=false
      }
    })
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'COMPLETED': return 'text-green-600';
      case 'PENDING': return 'text-yellow-600';
      case 'FAILED': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency 
    }).format(amount/100);
  }

  onViewDetails(transactionId: number): void {
    console.log('View transaction details:', transactionId);
  }

  exportToExcel(): void {
    // Prepare the data for export
    console.log("in export")
    const exportData = this.transactions.map(transaction => ({
      'Transaction ID': transaction.transactionId,
      'User ID': transaction.userId,
      'Order ID': transaction.orderId,
      'Amount': this.formatAmount(transaction.amount, 'INR'),
      'Status': transaction.status,
      'Date of Transactions': this.formatDateTime(transaction.createdAt)
    }));

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

    // Save file
    const fileName = `transactions_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
}
