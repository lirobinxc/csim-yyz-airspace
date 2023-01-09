import { SID_ROUTES_06s } from '../config/RouteConfigRwy06sSIDs';
import { SID_ROUTES_24s } from '../config/RouteConfigRwy24sSIDs';
import { SID_ROUTES_33s } from '../config/RouteConfigRwy33sSIDs';
import RadarScene from '../scenes/RadarScene';
import { RadarSceneKeys } from '../types/SceneKeys';
import { SatelliteName, SidName } from '../types/SidAndSatelliteTypes';

export function getSidRoute(runwayConfig: RadarSceneKeys, sidName: SidName) {
  switch (runwayConfig) {
    case RadarSceneKeys.RADAR_06s:
      return SID_ROUTES_06s[sidName];
    case RadarSceneKeys.RADAR_24s:
      return SID_ROUTES_24s[sidName];
    case RadarSceneKeys.RADAR_33s:
      return SID_ROUTES_33s[sidName];
    default:
      throw new Error(`Could not get SID Route for scene: ${runwayConfig}`);
  }
}
