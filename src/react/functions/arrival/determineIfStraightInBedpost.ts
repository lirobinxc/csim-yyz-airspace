import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { ArrBedpost } from './genArrRoute';

export function determineIfStraightInBedpost(
  radarSceneKey: RadarSceneKeys,
  arrBedpost: ArrBedpost
) {
  switch (radarSceneKey) {
    case RadarSceneKeys.RADAR_06s:
      if (arrBedpost === ArrBedpost.NUBER) {
        return true;
      }
      break;
    case RadarSceneKeys.RADAR_15s:
      if (arrBedpost === ArrBedpost.BOXUM) {
        return true;
      }
      break;
    case RadarSceneKeys.RADAR_24s:
      if (arrBedpost === ArrBedpost.IMEBA || arrBedpost === ArrBedpost.RAGID) {
        return true;
      }
      break;
    case RadarSceneKeys.RADAR_33s:
      if (arrBedpost === ArrBedpost.LINNG) {
        return true;
      }
      break;
  }

  return false;
}
