import { AdjacentSectors } from '../../../phaser/types/SectorTypes';
import { ArrBedpost } from './genArrRoute';

export function determineBedpostSector(arrBedpost: ArrBedpost) {
  switch (arrBedpost) {
    case ArrBedpost.BOXUM:
      return AdjacentSectors.VV;
    case ArrBedpost.NUBER:
      return AdjacentSectors.KF;
    case ArrBedpost.LINNG:
      return AdjacentSectors.GR;
    case ArrBedpost.RAGID:
      return AdjacentSectors.SI;
    case ArrBedpost.IMEBA:
      return AdjacentSectors.SI;
  }
}
