import _, { sample } from 'lodash';
import { AcType } from '../../../phaser/types/AircraftTypes';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { sidsCollection } from '../../data/sidsCollection';

export enum StarName {
  BOXUM = 'BOXUM',
  DUVOS = 'DUVOS',
  NUBER = 'NUBER',
  NAKBO = 'NAKBO',
  LINNG = 'LINNG',
  VERKO = 'VERKO',
  IMEBA = 'IMEBA',
  VIBLI = 'VIBLI',
  RAGID = 'RAGID',
  UDNOX = 'UDNOX',
}

const jetStars = [
  StarName.BOXUM,
  StarName.NUBER,
  StarName.LINNG,
  StarName.IMEBA,
  StarName.RAGID,
];
const propStars = [
  StarName.DUVOS,
  StarName.NAKBO,
  StarName.VERKO,
  StarName.VIBLI,
  StarName.UDNOX,
];

export function genArrRoute(radarScene: RadarSceneKeys, acType: AcType) {
  let route: StarName | undefined;

  switch (acType) {
    case AcType.JET:
      route = _.sample(jetStars);
      break;
    case AcType.PROP:
      route = _.sample(propStars);
      break;
  }

  if (!route) {
    throw new Error('Could not generate Arrival Route.');
  }

  return route;
}
