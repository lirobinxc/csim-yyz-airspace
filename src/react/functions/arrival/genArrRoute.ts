import _, { sample } from 'lodash';
import { AcType } from '../../../phaser/types/AircraftTypes';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { sidsCollection } from '../../data/sidsCollection';
import { getSimOptions } from '../../state/getSimOptions';

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

export enum ArrBedpost {
  BOXUM = 'BOXUM',
  NUBER = 'NUBER',
  LINNG = 'LINNG',
  IMEBA = 'IMEBA',
  RAGID = 'RAGID',
}

const jetStars: { [key in ArrBedpost]: StarName } = {
  BOXUM: StarName.BOXUM,
  NUBER: StarName.NUBER,
  LINNG: StarName.LINNG,
  IMEBA: StarName.IMEBA,
  RAGID: StarName.RAGID,
};
const propStars: { [key in ArrBedpost]: StarName } = {
  BOXUM: StarName.DUVOS,
  NUBER: StarName.NAKBO,
  LINNG: StarName.VERKO,
  IMEBA: StarName.VIBLI,
  RAGID: StarName.UDNOX,
};

export function genArrRoute(acType: AcType, activeBedposts: ArrBedpost[]) {
  let route: StarName | undefined;

  const selectedBedpost = _.sample(activeBedposts);

  if (!selectedBedpost) {
    throw new Error('No bedpost could be selected to generate an arrival');
  }

  switch (acType) {
    case AcType.JET:
      route = jetStars[selectedBedpost];
      break;
    case AcType.PROP:
      route = propStars[selectedBedpost];
      break;
  }

  if (!route) {
    throw new Error('Could not generate Arrival Route.');
  }

  return route;
}
