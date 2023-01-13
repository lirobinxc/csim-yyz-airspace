import { SAT_ROUTES } from '../config/RouteConfigSatellite';
import { SatelliteName } from '../types/SidAndSatelliteTypes';

export function getSatRoute(satName: SatelliteName) {
  return SAT_ROUTES[satName];
}
