import { StarName } from '../../../react/functions/arrival/genArrRoute';
import { WaypointDataArr06s } from '../../types/WaypointTypesArr';
import { WP_DICT_ARR_06s } from '../WaypointConfigArr/WaypointConfigArr06s';
import { ArrivalPosition } from '../../../react/functions/arrival/arrivalTypes';

const boxumDuvos = [
  WP_DICT_ARR_06s.BOXUM,
  WP_DICT_ARR_06s.DUVOS,
  WP_DICT_ARR_06s.ERBUS,
  WP_DICT_ARR_06s.MODOL,
  WP_DICT_ARR_06s.SELAP,
  WP_DICT_ARR_06s.DUNOP,
  WP_DICT_ARR_06s.LITRO,
  WP_DICT_ARR_06s.DERLI,
];

const nuberNakbo05 = [
  WP_DICT_ARR_06s.NUBER,
  WP_DICT_ARR_06s.IKBAT,
  WP_DICT_ARR_06s.ILANI,
  WP_DICT_ARR_06s.DULPA,
  WP_DICT_ARR_06s.KERPU,
];

const nuberNakbo06L = [
  WP_DICT_ARR_06s.NUBER,
  WP_DICT_ARR_06s.IKBAT,
  WP_DICT_ARR_06s.KEDRO,
  WP_DICT_ARR_06s.FAYOL,
  WP_DICT_ARR_06s.VEPNA,
];

const linngVerko = [
  WP_DICT_ARR_06s.LINNG,
  WP_DICT_ARR_06s.SEDAB,
  WP_DICT_ARR_06s.DEGRO,
  WP_DICT_ARR_06s.SEGOD,
  WP_DICT_ARR_06s.VERKO,
  WP_DICT_ARR_06s.DARPU,
  WP_DICT_ARR_06s.DANIP,
  WP_DICT_ARR_06s.MASAR,
  WP_DICT_ARR_06s.LERAN,
];
const imebaVibli05 = [
  WP_DICT_ARR_06s.IMEBA,
  WP_DICT_ARR_06s.SEKOP,
  WP_DICT_ARR_06s.BISDA,
  WP_DICT_ARR_06s.PILPO,
  WP_DICT_ARR_06s.ERBUS,
  WP_DICT_ARR_06s.MODOL,
  WP_DICT_ARR_06s.SELAP,
  WP_DICT_ARR_06s.DUNOP,
  WP_DICT_ARR_06s.LITRO,
  WP_DICT_ARR_06s.DERLI,
];
const imebaVibli06L = [
  WP_DICT_ARR_06s.IMEBA,
  WP_DICT_ARR_06s.SEKOP,
  WP_DICT_ARR_06s.BISDA,
  WP_DICT_ARR_06s.PEKMO,
  WP_DICT_ARR_06s.VERKO,
  WP_DICT_ARR_06s.DARPU,
  WP_DICT_ARR_06s.DANIP,
  WP_DICT_ARR_06s.MASAR,
  WP_DICT_ARR_06s.LERAN,
];
const ragidUdnox05s = [
  WP_DICT_ARR_06s.RAGID,
  WP_DICT_ARR_06s.LERAT,
  WP_DICT_ARR_06s.SEMTI,
  WP_DICT_ARR_06s.KEVNO,
  WP_DICT_ARR_06s.ERBUS,
  WP_DICT_ARR_06s.MODOL,
  WP_DICT_ARR_06s.SELAP,
  WP_DICT_ARR_06s.DUNOP,
  WP_DICT_ARR_06s.LITRO,
  WP_DICT_ARR_06s.DERLI,
];
const ragidUdnox06L = [
  WP_DICT_ARR_06s.RAGID,
  WP_DICT_ARR_06s.LERAT,
  WP_DICT_ARR_06s.SEMTI,
  WP_DICT_ARR_06s.PEKMO,
  WP_DICT_ARR_06s.VERKO,
  WP_DICT_ARR_06s.DARPU,
  WP_DICT_ARR_06s.DANIP,
  WP_DICT_ARR_06s.MASAR,
  WP_DICT_ARR_06s.LERAN,
];

export const STAR_ROUTES_06s: {
  [key in StarName]: {
    [key in ArrivalPosition]: WaypointDataArr06s[];
  };
} = {
  BOXUM: {
    [ArrivalPosition.NORTH]: boxumDuvos,
    [ArrivalPosition.SOUTH]: boxumDuvos,
  },
  DUVOS: {
    [ArrivalPosition.NORTH]: boxumDuvos,
    [ArrivalPosition.SOUTH]: boxumDuvos,
  },
  NUBER: {
    [ArrivalPosition.NORTH]: nuberNakbo05,
    [ArrivalPosition.SOUTH]: nuberNakbo06L,
  },
  NAKBO: {
    [ArrivalPosition.NORTH]: nuberNakbo05,
    [ArrivalPosition.SOUTH]: nuberNakbo06L,
  },
  LINNG: {
    [ArrivalPosition.NORTH]: linngVerko,
    [ArrivalPosition.SOUTH]: linngVerko,
  },
  VERKO: {
    [ArrivalPosition.NORTH]: linngVerko,
    [ArrivalPosition.SOUTH]: linngVerko,
  },
  IMEBA: {
    [ArrivalPosition.NORTH]: imebaVibli05,
    [ArrivalPosition.SOUTH]: imebaVibli06L,
  },
  VIBLI: {
    [ArrivalPosition.NORTH]: imebaVibli05,
    [ArrivalPosition.SOUTH]: imebaVibli06L,
  },
  RAGID: {
    [ArrivalPosition.NORTH]: ragidUdnox05s,
    [ArrivalPosition.SOUTH]: ragidUdnox06L,
  },
  UDNOX: {
    [ArrivalPosition.NORTH]: ragidUdnox05s,
    [ArrivalPosition.SOUTH]: ragidUdnox06L,
  },
};
