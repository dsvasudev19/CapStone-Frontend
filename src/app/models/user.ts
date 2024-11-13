import { Ticket } from "./ticket";

export interface User {
    id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdDate: string; 
  tickets: Ticket[];
}
