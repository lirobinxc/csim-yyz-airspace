import { SID_ROUTES_06s } from '../config/RouteConfigRwy06sSIDs';
import { SAT_ROUTES } from '../config/RouteConfigSatellite';
import { RadarSceneKeys } from '../types/SceneKeys';
import { SatelliteName } from '../types/SidAndSatelliteTypes';

export function getSatRoute(satName: SatelliteName) {
  return SAT_ROUTES[satName];
}
