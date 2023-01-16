import { SAT_ROUTES } from '../config/RouteConfig_SIDs_Satellite/RouteConfig_Satellite';
import { SatelliteName } from '../types/SidAndSatelliteTypes';

export function getSatRoute(satName: SatelliteName) {
  return SAT_ROUTES[satName];
}
