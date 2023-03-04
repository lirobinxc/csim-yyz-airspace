import { ArrBedpost, StarName } from './genArrRoute';

export function determineArrBedpost(starName: StarName) {
  switch (starName) {
    case StarName.BOXUM:
      return ArrBedpost.BOXUM;
    case StarName.DUVOS:
      return ArrBedpost.BOXUM;
    case StarName.NUBER:
      return ArrBedpost.NUBER;
    case StarName.NAKBO:
      return ArrBedpost.NUBER;
    case StarName.LINNG:
      return ArrBedpost.LINNG;
    case StarName.VERKO:
      return ArrBedpost.LINNG;
    case StarName.IMEBA:
      return ArrBedpost.IMEBA;
    case StarName.VIBLI:
      return ArrBedpost.IMEBA;
    case StarName.RAGID:
      return ArrBedpost.RAGID;
    case StarName.UDNOX:
      return ArrBedpost.RAGID;
  }
}
