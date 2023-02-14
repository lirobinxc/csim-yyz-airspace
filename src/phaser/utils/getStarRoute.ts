import { ArrivalPosition } from '../types/ArrivalTypes';
import { ArrFDE } from '../../react/functions/arrival/genArrFDE';
import {
  ArrBedpost,
  StarName,
} from '../../react/functions/arrival/genArrRoute';
import { STAR_ROUTES_06s } from '../config/RouteConfigArr/RouteConfigStars06s';
import { SID_ROUTES_06s } from '../config/RouteConfigDep/RouteConfigSids06s';
import { SID_ROUTES_15s } from '../config/RouteConfigDep/RouteConfigSids15s';
import { SID_ROUTES_24s } from '../config/RouteConfigDep/RouteConfigSids24s';
import { SID_ROUTES_33s } from '../config/RouteConfigDep/RouteConfigSids33s';
import { RadarSceneKeys } from '../types/SceneKeys';

export function getStarRoute(
  runwayConfig: RadarSceneKeys,
  arrBedpost: ArrBedpost,
  arrPosition: ArrivalPosition
) {
  switch (runwayConfig) {
    case RadarSceneKeys.RADAR_06s:
      return STAR_ROUTES_06s[arrBedpost][arrPosition];
    // case RadarSceneKeys.RADAR_24s:
    //   return SID_ROUTES_24s[arrBedpost];
    // case RadarSceneKeys.RADAR_33s:
    //   return SID_ROUTES_33s[arrBedpost];
    // case RadarSceneKeys.RADAR_15s:
    //   return SID_ROUTES_15s[arrBedpost];
    default:
      throw new Error(`Could not get SID Route for scene: ${runwayConfig}`);
  }
}
