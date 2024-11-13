import { CarPool } from "./car-pool";

export interface CarPoolUser {
    id: number;
    userId: number;
    requestTime: string; // Time as string (ISO format)
    carpool: CarPool;
}
