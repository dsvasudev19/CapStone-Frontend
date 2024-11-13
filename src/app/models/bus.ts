import { BusSchedule } from "./bus-schedule";
import { RealTimeData } from "./real-time-data";

export interface Bus {
    id: number;
    routeId: number;
    capacity: number;
    status: string;
    realTimeData: RealTimeData[];
    busSchedules: BusSchedule[];
}
