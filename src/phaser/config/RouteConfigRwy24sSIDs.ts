import { WaypointData24s } from '../types/WaypointTypes';
import { SidName } from '../types/SidAndSatelliteTypes';
import { WP_DICT_Rwy24s } from './WaypointConfigRwy24s';

export const SID_ROUTES_24s: {
  [key in SidName]: WaypointData24s[];
} = {
  'ANCOL DEP': [WP_DICT_Rwy24s.MIXUT, WP_DICT_Rwy24s.LETOR],
  'AVSEP DEP': [
    WP_DICT_Rwy24s.TILAM,
    WP_DICT_Rwy24s.AVSEP,
    WP_DICT_Rwy24s.NUGOP,
  ],
  'BETES DEP': [
    WP_DICT_Rwy24s.MURNO,
    WP_DICT_Rwy24s.OAKVL,
    WP_DICT_Rwy24s.BETES,
  ],
  'BOMET DEP': [
    WP_DICT_Rwy24s.MAVAN,
    WP_DICT_Rwy24s.GAGPO,
    WP_DICT_Rwy24s.DAVSI,
    WP_DICT_Rwy24s.TESUK,
  ],
  'DEDKI DEP': [
    WP_DICT_Rwy24s.SAVUR,
    WP_DICT_Rwy24s.SEKIT,
    WP_DICT_Rwy24s.DEDKI,
  ],
  'DUSOM DEP': [
    WP_DICT_Rwy24s.SAVUR,
    WP_DICT_Rwy24s.DUSOM,
    WP_DICT_Rwy24s.RIGUS,
  ],
  'EBKIN DEP': [
    WP_DICT_Rwy24s.MATES,
    WP_DICT_Rwy24s.EBKIN,
    WP_DICT_Rwy24s.KISEP,
  ],
  'GOPUP DEP': [WP_DICT_Rwy24s.TILAM, WP_DICT_Rwy24s.TULEK],
  'IKLEN DEP': [
    WP_DICT_Rwy24s.BISTI,
    WP_DICT_Rwy24s.NAMGI,
    WP_DICT_Rwy24s.IKLEN,
    WP_DICT_Rwy24s.TONNY,
  ],
  'KEPTA DEP': [
    WP_DICT_Rwy24s.SAVUR,
    WP_DICT_Rwy24s.SEKIT,
    WP_DICT_Rwy24s.RIKEM,
    WP_DICT_Rwy24s.KEPTA,
  ],
  'KISEP DEP': [
    WP_DICT_Rwy24s.BISTI,
    WP_DICT_Rwy24s.NAMGI,
    WP_DICT_Rwy24s.EBKIN,
    WP_DICT_Rwy24s.KISEP,
  ],
  'LAKES DEP': [
    WP_DICT_Rwy24s.MATES,
    WP_DICT_Rwy24s.SEDOG,
    WP_DICT_Rwy24s.TANGI,
  ],
  'MATES DEP': [
    WP_DICT_Rwy24s.MATES,
    WP_DICT_Rwy24s.IKLEN,
    WP_DICT_Rwy24s.TONNY,
  ],
  'MAVAN DEP': [
    WP_DICT_Rwy24s.MAVAN,
    WP_DICT_Rwy24s.RIKEM,
    WP_DICT_Rwy24s.KEPTA,
  ],
  'MIXUT DEP': [WP_DICT_Rwy24s.MIXUT, WP_DICT_Rwy24s.LETOR],
  'NOSIK DEP': [WP_DICT_Rwy24s.URSAL, WP_DICT_Rwy24s.NOSIK],
  'NUGOP DEP': [WP_DICT_Rwy24s.AVSEP, WP_DICT_Rwy24s.NUGOP],
  'OAKVL DEP': [
    WP_DICT_Rwy24s.SAVUR,
    WP_DICT_Rwy24s.OAKVL,
    WP_DICT_Rwy24s.BETES,
  ],
  'PEMBA DEP': [
    WP_DICT_Rwy24s.TILAM,
    WP_DICT_Rwy24s.MIXUT,
    WP_DICT_Rwy24s.LETOR,
  ],
  'PERLO DEP': [
    WP_DICT_Rwy24s.TILAM,
    WP_DICT_Rwy24s.MIXUT,
    WP_DICT_Rwy24s.LETOR,
  ],
  'RIGUS DEP': [
    WP_DICT_Rwy24s.MURNO,
    WP_DICT_Rwy24s.DUSOM,
    WP_DICT_Rwy24s.RIGUS,
  ],
  'SEDOG DEP': [
    WP_DICT_Rwy24s.BISTI,
    WP_DICT_Rwy24s.NAMGI,
    WP_DICT_Rwy24s.SEDOG,
    WP_DICT_Rwy24s.TANGI,
  ],
  'TEVAD DEP': [
    WP_DICT_Rwy24s.MAVAN,
    WP_DICT_Rwy24s.NADUM,
    WP_DICT_Rwy24s.TEVAD,
  ],
  'TULEK DEP': [WP_DICT_Rwy24s.TULEK],
  'URSAL DEP': [
    WP_DICT_Rwy24s.TILAM,
    WP_DICT_Rwy24s.URSAL,
    WP_DICT_Rwy24s.NOSIK,
  ],
  'VERDO DEP': [
    WP_DICT_Rwy24s.SAVUR,
    WP_DICT_Rwy24s.SEKIT,
    WP_DICT_Rwy24s.VERDO,
  ],
};
