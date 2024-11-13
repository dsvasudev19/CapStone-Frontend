export interface Transaction {
  transactionId: number;
  userId: number;
  currency: string;
  amount: number;
  status: string;
  orderId: string;
  createdAt: string; 
  updatedAt: string;
}
