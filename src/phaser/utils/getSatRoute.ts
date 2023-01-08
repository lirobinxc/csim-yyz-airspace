import { SID_ROUTES_06s } from '../config/RouteConfigRwy06sSIDs';
import { SAT_ROUTES } from '../config/RouteConfigSatellite';
import { RadarSceneKeys } from '../types/SceneKeys';
import { SatelliteName } from '../types/SidAndSatelliteTypes';

export function getSatRoute(
  runwayConfig: RadarSceneKeys,
  satName: SatelliteName
) {
  switch (runwayConfig) {
    case RadarSceneKeys.RADAR_06s:
      return SAT_ROUTES[satName];
    default:
      throw new Error(
        `Could not get Satellite Route for scene: ${runwayConfig}`
      );
  }
}
