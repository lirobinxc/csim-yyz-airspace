import { DepRunwayYYZ } from '../../../engine/types/AirportTypes';
import { RadarSceneKeys } from '../../../engine/types/SceneKeys';
import { DeparturePosition } from './departureTypes';

export function determineDepRunwayYYZ(
  radarScene: RadarSceneKeys,
  departurePosition: DeparturePosition,
  isSingleOps: boolean
) {
  switch (radarScene) {
    case RadarSceneKeys.RADAR_06s:
      if (isSingleOps) return DepRunwayYYZ.RWY_06L;
      if (departurePosition === DeparturePosition.ND)
        return DepRunwayYYZ.RWY_05;
      if (departurePosition === DeparturePosition.SD)
        return DepRunwayYYZ.RWY_06L;
      throw new Error(
        `Could not determine DepRunwayYYZ. Args: ${radarScene}, ${departurePosition}, ${isSingleOps}`
      );
    case RadarSceneKeys.RADAR_24s:
      if (isSingleOps) return DepRunwayYYZ.RWY_24R;
      if (departurePosition === DeparturePosition.ND)
        return DepRunwayYYZ.RWY_23;
      if (departurePosition === DeparturePosition.SD)
        return DepRunwayYYZ.RWY_24R;
      throw new Error(
        `Could not determine DepRunwayYYZ. Args: ${radarScene}, ${departurePosition}, ${isSingleOps}`
      );
    case RadarSceneKeys.RADAR_15s:
      return DepRunwayYYZ.RWY_15L;
    case RadarSceneKeys.RADAR_33s:
      return DepRunwayYYZ.RWY_33R;
    default:
      throw new Error(
        `Could not determine DepRunwayYYZ. Args: ${radarScene}, ${departurePosition}, ${isSingleOps}`
      );
  }
}
