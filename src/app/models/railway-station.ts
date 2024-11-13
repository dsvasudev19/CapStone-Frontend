import { Route } from "./route";

export interface RailwayStation {
    id: number;
  name: string;
  latitude: number;
  longitude: number;
  route: Route;
}
