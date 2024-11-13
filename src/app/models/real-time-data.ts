import { Bus } from "./bus";

export interface RealTimeData {
    id: number;
    bus: Bus;
    latitude: number;
    longitude: number;
    timestamp: string; // Time as string (ISO format)
    occupancy: number;
    nextStop: string;
}
