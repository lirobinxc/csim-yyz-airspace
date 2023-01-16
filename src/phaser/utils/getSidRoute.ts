import { SID_ROUTES_06s } from '../config/RouteConfig_SIDs_Satellite/RouteConfigRwy06s_SIDs';
import { SID_ROUTES_15s } from '../config/RouteConfig_SIDs_Satellite/RouteConfigRwy15s_SIDs';
import { SID_ROUTES_24s } from '../config/RouteConfig_SIDs_Satellite/RouteConfigRwy24s_SIDs';
import { SID_ROUTES_33s } from '../config/RouteConfig_SIDs_Satellite/RouteConfigRwy33s_SIDs';
import { RadarSceneKeys } from '../types/SceneKeys';
import { SidName } from '../types/SidAndSatelliteTypes';

export function getSidRoute(runwayConfig: RadarSceneKeys, sidName: SidName) {
  switch (runwayConfig) {
    case RadarSceneKeys.RADAR_06s:
      return SID_ROUTES_06s[sidName];
    case RadarSceneKeys.RADAR_24s:
      return SID_ROUTES_24s[sidName];
    case RadarSceneKeys.RADAR_33s:
      return SID_ROUTES_33s[sidName];
    case RadarSceneKeys.RADAR_15s:
      return SID_ROUTES_15s[sidName];
    default:
      throw new Error(`Could not get SID Route for scene: ${runwayConfig}`);
  }
}
