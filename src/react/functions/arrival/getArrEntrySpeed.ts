import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { StarName } from './genArrRoute';

export function getArrEntrySpeed(
  radarScene: RadarSceneKeys,
  starName: StarName
) {
  if (radarScene === RadarSceneKeys.RADAR_06s) {
    switch (starName) {
      case StarName.BOXUM:
        return 250;
      case StarName.DUVOS:
        return 250;
      case StarName.NUBER:
        return 220;
      case StarName.NAKBO:
        return 220;
      case StarName.LINNG:
        return 250;
      case StarName.VERKO:
        return 250;
      case StarName.IMEBA:
        return 250;
      case StarName.VIBLI:
        return 250;
      case StarName.RAGID:
        return 250;
      case StarName.UDNOX:
        return 250;
    }
  }
  if (radarScene === RadarSceneKeys.RADAR_15s) {
    switch (starName) {
      case StarName.BOXUM:
        return 220;
      case StarName.DUVOS:
        return 220;
      case StarName.NUBER:
        return 250;
      case StarName.NAKBO:
        return 250;
      case StarName.LINNG:
        return 250;
      case StarName.VERKO:
        return 250;
      case StarName.IMEBA:
        return 250;
      case StarName.VIBLI:
        return 250;
      case StarName.RAGID:
        return 250;
      case StarName.UDNOX:
        return 250;
    }
  }
  if (radarScene === RadarSceneKeys.RADAR_24s) {
    switch (starName) {
      case StarName.BOXUM:
        return 250;
      case StarName.DUVOS:
        return 250;
      case StarName.NUBER:
        return 250;
      case StarName.NAKBO:
        return 250;
      case StarName.LINNG:
        return 250;
      case StarName.VERKO:
        return 250;
      case StarName.IMEBA:
        return 220;
      case StarName.VIBLI:
        return 220;
      case StarName.RAGID:
        return 220;
      case StarName.UDNOX:
        return 220;
    }
  }
  if (radarScene === RadarSceneKeys.RADAR_33s) {
    switch (starName) {
      case StarName.BOXUM:
        return 250;
      case StarName.DUVOS:
        return 250;
      case StarName.NUBER:
        return 250;
      case StarName.NAKBO:
        return 250;
      case StarName.LINNG:
        return 220;
      case StarName.VERKO:
        return 220;
      case StarName.IMEBA:
        return 250;
      case StarName.VIBLI:
        return 250;
      case StarName.RAGID:
        return 250;
      case StarName.UDNOX:
        return 250;
    }
  }

  throw new Error('Could not get Arrival Entry Altitude.');
}
