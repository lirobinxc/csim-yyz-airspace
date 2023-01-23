import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { StarName } from './genArrRoute';

export function getArrEntryAlt(radarScene: RadarSceneKeys, starName: StarName) {
  if (radarScene === RadarSceneKeys.RADAR_06s) {
    switch (starName) {
      case StarName.BOXUM:
        return 100;
      case StarName.DUVOS:
        return 90;
      case StarName.NUBER:
        return 70;
      case StarName.NAKBO:
        return 70;
      case StarName.LINNG:
        return 110;
      case StarName.VERKO:
        return 90;
      case StarName.IMEBA:
        return 130;
      case StarName.VIBLI:
        return 90;
      case StarName.RAGID:
        return 110;
      case StarName.UDNOX:
        return 90;
    }
  }
  if (radarScene === RadarSceneKeys.RADAR_15s) {
    switch (starName) {
      case StarName.BOXUM:
        return 70;
      case StarName.DUVOS:
        return 70;
      case StarName.NUBER:
        return 110;
      case StarName.NAKBO:
        return 90;
      case StarName.LINNG:
        return 110;
      case StarName.VERKO:
        return 90;
      case StarName.IMEBA:
        return 130;
      case StarName.VIBLI:
        return 90;
      case StarName.RAGID:
        return 130;
      case StarName.UDNOX:
        return 90;
    }
  }
  if (radarScene === RadarSceneKeys.RADAR_24s) {
    switch (starName) {
      case StarName.BOXUM:
        return 100;
      case StarName.DUVOS:
        return 90;
      case StarName.NUBER:
        return 110;
      case StarName.NAKBO:
        return 90;
      case StarName.LINNG:
        return 110;
      case StarName.VERKO:
        return 90;
      case StarName.IMEBA:
        return 80;
      case StarName.VIBLI:
        return 80;
      case StarName.RAGID:
        return 70;
      case StarName.UDNOX:
        return 70;
    }
  }
  if (radarScene === RadarSceneKeys.RADAR_33s) {
    switch (starName) {
      case StarName.BOXUM:
        return 100;
      case StarName.DUVOS:
        return 90;
      case StarName.NUBER:
        return 110;
      case StarName.NAKBO:
        return 90;
      case StarName.LINNG:
        return 70;
      case StarName.VERKO:
        return 70;
      case StarName.IMEBA:
        return 130;
      case StarName.VIBLI:
        return 90;
      case StarName.RAGID:
        return 130;
      case StarName.UDNOX:
        return 90;
    }
  }

  throw new Error('Could not get Arrival Entry Altitude.');
}
