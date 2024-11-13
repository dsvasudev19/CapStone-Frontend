import {Bus} from './bus'
export interface BusSchedule {
    id: number;
    routeId: number;
    departureTime: string; // Time as string (ISO format)
    destinationArrivalTime: string; // Time as string (ISO format)
    operatingStatus: boolean;
    bus: Bus;
}
