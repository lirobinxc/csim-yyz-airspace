import _, { sample } from 'lodash';
import { AcType } from '../../../engine/types/AircraftTypes';
import { RadarSceneKeys } from '../../../engine/types/SceneKeys';
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

export function genArrRoute(
  acType: AcType,
  activeBedposts: ArrBedpost[],
  priorityBedpost: ArrBedpost | undefined
) {
  let starName: StarName | undefined;

  const selectedBedpost = _.sample(activeBedposts);

  if (!selectedBedpost) {
    throw new Error('No bedpost could be selected to generate an arrival');
  }

  switch (acType) {
    case AcType.JET:
      starName = jetStars[selectedBedpost];
      break;
    case AcType.PROP:
      starName = propStars[selectedBedpost];
      break;
  }

  if (priorityBedpost && activeBedposts.includes(priorityBedpost)) {
    const randomNum = _.random(10);

    if (randomNum > 4) {
      switch (priorityBedpost) {
        case ArrBedpost.BOXUM:
          starName = StarName.BOXUM;
          break;
        case ArrBedpost.NUBER:
          starName = StarName.NUBER;
          break;
        case ArrBedpost.LINNG:
          starName = StarName.LINNG;
          break;
        case ArrBedpost.RAGID:
          starName = StarName.RAGID;
          break;
        case ArrBedpost.IMEBA:
          starName = StarName.IMEBA;
          break;
      }
    }
  }

  if (!starName) {
    throw new Error('Could not generate Arrival Route.');
  }

  return starName;
}
