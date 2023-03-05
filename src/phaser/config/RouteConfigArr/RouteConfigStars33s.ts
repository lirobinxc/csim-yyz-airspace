import {
  ArrBedpost,
  StarName,
} from '../../../react/functions/arrival/genArrRoute';
import { WaypointDataArr33s } from '../../types/WaypointTypesArr';
import { WP_DICT_ARR_33s } from '../WaypointConfigArr/WaypointConfigArr33s';
import { ArrivalPosition } from '../../types/ArrivalTypes';

const boxumDuvos33L = [
  // WP_DICT_ARR_33s.BOXUM,
  WP_DICT_ARR_33s.DUVOS,
  WP_DICT_ARR_33s.ERBUS,
  WP_DICT_ARR_33s.REVOV,
  WP_DICT_ARR_33s.NOXER,
  WP_DICT_ARR_33s.ALORU,
  WP_DICT_ARR_33s.DANAV,
  WP_DICT_ARR_33s.ALMAX,
];
const boxumDuvos33R = [
  // WP_DICT_ARR_33s.BOXUM,
  WP_DICT_ARR_33s.DUVOS,
  WP_DICT_ARR_33s.ERBUS,
  WP_DICT_ARR_33s.MIRUG,
  WP_DICT_ARR_33s.GUBOV,
  WP_DICT_ARR_33s.OKOKU,
  WP_DICT_ARR_33s.MAVID,
  WP_DICT_ARR_33s.KEDSU,
];

const nuberNakbo = [
  // WP_DICT_ARR_33s.NUBER,
  WP_DICT_ARR_33s.ROKTO,
  WP_DICT_ARR_33s.PENGO,
  WP_DICT_ARR_33s.KENPU,
  WP_DICT_ARR_33s.REVOV,
  WP_DICT_ARR_33s.NOXER,
  WP_DICT_ARR_33s.ALORU,
  WP_DICT_ARR_33s.DANAV,
  WP_DICT_ARR_33s.ALMAX,
];

const linngVerko33L = [
  WP_DICT_ARR_33s.LINNG,
  WP_DICT_ARR_33s.MERKI,
  WP_DICT_ARR_33s.IKMEX,
  WP_DICT_ARR_33s.ERBAN,
  WP_DICT_ARR_33s.APMAM,
];

const linngVerko33R = [
  WP_DICT_ARR_33s.LINNG,
  WP_DICT_ARR_33s.MERKI,
  WP_DICT_ARR_33s.RIDOD,
  WP_DICT_ARR_33s.AGBEK,
  WP_DICT_ARR_33s.LETAG,
];

const imebaVibli = [
  // WP_DICT_ARR_33s.IMEBA,
  WP_DICT_ARR_33s.VIDRO,
  WP_DICT_ARR_33s.ELVUT,
  WP_DICT_ARR_33s.NUBAV,
  WP_DICT_ARR_33s.MIRUG,
  WP_DICT_ARR_33s.GUBOV,
  WP_DICT_ARR_33s.OKOKU,
  WP_DICT_ARR_33s.MAVID,
  WP_DICT_ARR_33s.KEDSU,
];

const ragidUdnox = [
  // WP_DICT_ARR_33s.RAGID,
  WP_DICT_ARR_33s.VIDRO,
  WP_DICT_ARR_33s.ELVUT,
  WP_DICT_ARR_33s.NUBAV,
  WP_DICT_ARR_33s.MIRUG,
  WP_DICT_ARR_33s.GUBOV,
  WP_DICT_ARR_33s.OKOKU,
  WP_DICT_ARR_33s.MAVID,
  WP_DICT_ARR_33s.KEDSU,
];

export const STAR_ROUTES_33s: {
  [key in ArrBedpost]: {
    [key in ArrivalPosition]: WaypointDataArr33s[];
  };
} = {
  BOXUM: {
    [ArrivalPosition.NORTH]: boxumDuvos33R,
    [ArrivalPosition.SOUTH]: boxumDuvos33L,
  },
  NUBER: {
    [ArrivalPosition.NORTH]: nuberNakbo,
    [ArrivalPosition.SOUTH]: nuberNakbo,
  },
  LINNG: {
    [ArrivalPosition.NORTH]: linngVerko33R,
    [ArrivalPosition.SOUTH]: linngVerko33L,
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
