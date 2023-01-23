import { SATELLITE_ROUTES } from '../config/RouteConfigDep/RouteConfigSatellite';
import { SatelliteName } from '../types/SidAndSatelliteTypes';

export function getSatRoute(satName: SatelliteName) {
  return SATELLITE_ROUTES[satName];
}
