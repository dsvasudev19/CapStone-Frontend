import { CarPoolUser } from "./car-pool-user";

export interface CarPool {
    id: number;
  driverId: number;
  routeId: number;
  capacity: number;
  availableSeats: number;
  departureTime: string; // Time as string (ISO format)
  pickupLocation: string;
  price: number;
  carpoolUsers: CarPoolUser[];
}
