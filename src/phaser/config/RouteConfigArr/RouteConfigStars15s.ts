import {
  ArrBedpost,
  StarName,
} from '../../../react/functions/arrival/genArrRoute';
import { WaypointDataArr15s } from '../../types/WaypointTypesArr';
import { WP_DICT_ARR_15s } from '../WaypointConfigArr/WaypointConfigArr15s';
import { ArrivalPosition } from '../../types/ArrivalTypes';

const boxumDuvos15L = [
  // WP_DICT_ARR_15s.BOXUM,
  WP_DICT_ARR_15s.DUVOS,
  WP_DICT_ARR_15s.ONGOX,
  WP_DICT_ARR_15s.BEFNI,
  WP_DICT_ARR_15s.WOHIL,
];
const boxumDuvos15R = [
  // WP_DICT_ARR_15s.BOXUM,
  WP_DICT_ARR_15s.DUVOS,
  WP_DICT_ARR_15s.BLOOS,
  WP_DICT_ARR_15s.PILKI,
  WP_DICT_ARR_15s.HOFFS,
];

const nuberNakbo = [
  // WP_DICT_ARR_15s.NUBER,
  WP_DICT_ARR_15s.ROKTO,
  WP_DICT_ARR_15s.PENGO,
  WP_DICT_ARR_15s.PIGSO,
  WP_DICT_ARR_15s.PILNI,
  WP_DICT_ARR_15s.IGTUL,
  WP_DICT_ARR_15s.GADOG,
  WP_DICT_ARR_15s.TAGAT,
  WP_DICT_ARR_15s.LOBNU,
];

const linngVerko15L = [
  WP_DICT_ARR_15s.LINNG,
  WP_DICT_ARR_15s.YOUTH,
  WP_DICT_ARR_15s.VERKO,
  WP_DICT_ARR_15s.PILNI,
  WP_DICT_ARR_15s.IGTUL,
  WP_DICT_ARR_15s.GADOG,
  WP_DICT_ARR_15s.TAGAT,
  WP_DICT_ARR_15s.LOBNU,
];

const linngVerko15R = [
  WP_DICT_ARR_15s.LINNG,
  WP_DICT_ARR_15s.YOUTH,
  WP_DICT_ARR_15s.VERKO,
  WP_DICT_ARR_15s.MIRUG,
  WP_DICT_ARR_15s.MITUX,
  WP_DICT_ARR_15s.OMTIP,
  WP_DICT_ARR_15s.KASIT,
  WP_DICT_ARR_15s.MEVPO,
];

const imebaVibli = [
  // WP_DICT_ARR_15s.IMEBA,
  WP_DICT_ARR_15s.VIDRO,
  WP_DICT_ARR_15s.TOVOP,
  WP_DICT_ARR_15s.DENPI,
  WP_DICT_ARR_15s.MIRUG,
  WP_DICT_ARR_15s.MITUX,
  WP_DICT_ARR_15s.OMTIP,
  WP_DICT_ARR_15s.KASIT,
  WP_DICT_ARR_15s.MEVPO,
];

const ragidUdnox = [
  // WP_DICT_ARR_15s.RAGID,
  WP_DICT_ARR_15s.VIDRO,
  WP_DICT_ARR_15s.TOVOP,
  WP_DICT_ARR_15s.DENPI,
  WP_DICT_ARR_15s.MIRUG,
  WP_DICT_ARR_15s.MITUX,
  WP_DICT_ARR_15s.OMTIP,
  WP_DICT_ARR_15s.KASIT,
  WP_DICT_ARR_15s.MEVPO,
];

export const STAR_ROUTES_15s: {
  [key in ArrBedpost]: {
    [key in ArrivalPosition]: WaypointDataArr15s[];
  };
} = {
  BOXUM: {
    [ArrivalPosition.NORTH]: boxumDuvos15L,
    [ArrivalPosition.SOUTH]: boxumDuvos15R,
  },
  NUBER: {
    [ArrivalPosition.NORTH]: nuberNakbo,
    [ArrivalPosition.SOUTH]: nuberNakbo,
  },
  LINNG: {
    [ArrivalPosition.NORTH]: linngVerko15R,
    [ArrivalPosition.SOUTH]: linngVerko15L,
  },
  IMEBA: {
    [ArrivalPosition.NORTH]: imebaVibli,
    [ArrivalPosition.SOUTH]: imebaVibli,
  },
  RAGID: {
    [ArrivalPosition.NORTH]: ragidUdnox,
    [ArrivalPosition.SOUTH]: ragidUdnox,
  },
};
