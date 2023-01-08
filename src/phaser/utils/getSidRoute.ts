import { SID_ROUTES_06s } from '../config/RouteConfigRwy06sSIDs';
import RadarScene from '../scenes/RadarScene';
import { RadarSceneKeys } from '../types/SceneKeys';
import { SatelliteName, SidName } from '../types/SidAndSatelliteTypes';

export function getSidRoute(runwayConfig: RadarSceneKeys, sidName: SidName) {
  switch (runwayConfig) {
    case RadarSceneKeys.RADAR_06s:
      return SID_ROUTES_06s[sidName];
    default:
      throw new Error(`Could not get SID Route for scene: ${runwayConfig}`);
  }
}
