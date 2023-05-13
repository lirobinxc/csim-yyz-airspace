import {
  ArrBedpost,
  StarName,
} from '../../../react/functions/arrival/genArrRoute';
import { WaypointDataArr24s } from '../../types/WaypointTypesArr';
import { WP_DICT_ARR_24s } from '../WaypointConfigArr/WaypointConfigArr24s';
import { ArrivalPosition } from '../../types/ArrivalTypes';

const boxumDuvos = [
  // WP_DICT_ARR_24s.BOXUM,
  WP_DICT_ARR_24s.DUVOS,
  WP_DICT_ARR_24s.ADSED,
  WP_DICT_ARR_24s.ERBUS,
  WP_DICT_ARR_24s.TASKU,
  WP_DICT_ARR_24s.DAVIK,
  WP_DICT_ARR_24s.LEVIG,
  WP_DICT_ARR_24s.MIPED,
  WP_DICT_ARR_24s.SATUR,
];

const nuberNakbo23 = [
  // WP_DICT_ARR_24s.NUBER,
  WP_DICT_ARR_24s.ROKTO,
  WP_DICT_ARR_24s.PENGO,
  WP_DICT_ARR_24s.MANUP,
  WP_DICT_ARR_24s.ERBUS,
  WP_DICT_ARR_24s.TASKU,
  WP_DICT_ARR_24s.DAVIK,
  WP_DICT_ARR_24s.LEVIG,
  WP_DICT_ARR_24s.MIPED,
  WP_DICT_ARR_24s.SATUR,
];

const nuberNakbo24R = [
  // WP_DICT_ARR_24s.NUBER,
  WP_DICT_ARR_24s.ROKTO,
  WP_DICT_ARR_24s.PENGO,
  WP_DICT_ARR_24s.BOTUM,
  WP_DICT_ARR_24s.VERKO,
  WP_DICT_ARR_24s.MAROD,
  WP_DICT_ARR_24s.DEKNI,
  WP_DICT_ARR_24s.DAVNO,
  WP_DICT_ARR_24s.DUNOL,
];

const linngVerko = [
  WP_DICT_ARR_24s.LINNG,
  WP_DICT_ARR_24s.YOUTH,
  WP_DICT_ARR_24s.BIMPO,
  WP_DICT_ARR_24s.VERKO,
  WP_DICT_ARR_24s.MAROD,
  WP_DICT_ARR_24s.DEKNI,
  WP_DICT_ARR_24s.DAVNO,
  WP_DICT_ARR_24s.DUNOL,
];
const imebaVibli23 = [
  // WP_DICT_ARR_24s.IMEBA,
  WP_DICT_ARR_24s.LEPUX,
  WP_DICT_ARR_24s.DUGDA_SouthOfLoc,
  WP_DICT_ARR_24s.CALVY,
  WP_DICT_ARR_24s.OMTOK,
];
const imebaVibli24R = [
  // WP_DICT_ARR_24s.IMEBA,
  WP_DICT_ARR_24s.LEPUX,
  WP_DICT_ARR_24s.AMILU_SouthOfLoc,
  WP_DICT_ARR_24s.EBDAL,
  WP_DICT_ARR_24s.NOAHA,
];
const ragidUdnox23 = [
  // WP_DICT_ARR_24s.RAGID,
  WP_DICT_ARR_24s.DENKA,
  WP_DICT_ARR_24s.DUGDA_NorthOfLoc,
  WP_DICT_ARR_24s.CALVY,
  WP_DICT_ARR_24s.OMTOK,
];
const ragidUdnox24R = [
  // WP_DICT_ARR_24s.RAGID,
  WP_DICT_ARR_24s.DENKA,
  WP_DICT_ARR_24s.AMILU_NorthOfLoc,
  WP_DICT_ARR_24s.EBDAL,
  WP_DICT_ARR_24s.NOAHA,
];

export const STAR_ROUTES_24s: {
  [key in ArrBedpost]: {
    [key in ArrivalPosition]: WaypointDataArr24s[];
  };
} = {
  BOXUM: {
    [ArrivalPosition.NORTH]: boxumDuvos,
    [ArrivalPosition.SOUTH]: boxumDuvos,
  },
  NUBER: {
    [ArrivalPosition.NORTH]: nuberNakbo23,
    [ArrivalPosition.SOUTH]: nuberNakbo24R,
  },
  LINNG: {
    [ArrivalPosition.NORTH]: linngVerko,
    [ArrivalPosition.SOUTH]: linngVerko,
  },
  IMEBA: {
    [ArrivalPosition.NORTH]: imebaVibli23,
    [ArrivalPosition.SOUTH]: imebaVibli24R,
  },
  RAGID: {
    [ArrivalPosition.NORTH]: ragidUdnox23,
    [ArrivalPosition.SOUTH]: ragidUdnox24R,
  },
};
