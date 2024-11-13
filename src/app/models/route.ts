import { RailwayStation } from "./railway-station";
import { Stop } from "./stop";

export interface Route {
  id: number;
  name: string;
  origin: string;
  destination: string;
  stops: Stop[];
  stations: RailwayStation[];
}
