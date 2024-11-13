import { Route } from "./route";

export interface Stop {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    route: Route;
}
