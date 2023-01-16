import { WaypointData33sDep } from '../../types/WaypointTypesDep';
import { SidName } from '../../types/SidAndSatelliteTypes';
import { WP_DICT_Rwy33s } from '../WaypointConfig_Dep/WaypointConfigRwy33s_Dep';

export const SID_ROUTES_33s: {
  [key in SidName]: WaypointData33sDep[];
} = {
  'ANCOL DEP': [
    WP_DICT_Rwy33s.NUBAX,
    WP_DICT_Rwy33s.TANGU,
    WP_DICT_Rwy33s.MIXUT,
    WP_DICT_Rwy33s.LETOR,
  ],
  'AVSEP DEP': [
    WP_DICT_Rwy33s.TETAD,
    WP_DICT_Rwy33s.AVSEP,
    WP_DICT_Rwy33s.NUGOP,
  ],
  'BETES DEP': [
    WP_DICT_Rwy33s.NUBAX,
    WP_DICT_Rwy33s.TANGU,
    WP_DICT_Rwy33s.OAKVL,
    WP_DICT_Rwy33s.BETES,
  ],
  'BOMET DEP': [
    WP_DICT_Rwy33s.NUBAN,
    WP_DICT_Rwy33s.AVROS,
    WP_DICT_Rwy33s.TESUK,
  ],
  'DEDKI DEP': [
    WP_DICT_Rwy33s.VIVET,
    WP_DICT_Rwy33s.DUVAK,
    WP_DICT_Rwy33s.PUTON,
    WP_DICT_Rwy33s.DEDKI,
  ],
  'DUSOM DEP': [
    WP_DICT_Rwy33s.SERPI,
    WP_DICT_Rwy33s.DUSOM,
    WP_DICT_Rwy33s.RIGUS,
  ],
  'EBKIN DEP': [WP_DICT_Rwy33s.EBKIN, WP_DICT_Rwy33s.KISEP],
  'GOPUP DEP': [WP_DICT_Rwy33s.TETAD, WP_DICT_Rwy33s.TULEK],
  'IKLEN DEP': [WP_DICT_Rwy33s.IKLEN, WP_DICT_Rwy33s.TONNY],
  'KEPTA DEP': [
    WP_DICT_Rwy33s.VIVET,
    WP_DICT_Rwy33s.BOTIB,
    WP_DICT_Rwy33s.RIKEM,
    WP_DICT_Rwy33s.KEPTA,
  ],
  'KISEP DEP': [WP_DICT_Rwy33s.EBKIN, WP_DICT_Rwy33s.KISEP],
  'LAKES DEP': [WP_DICT_Rwy33s.SEDOG, WP_DICT_Rwy33s.TANGI],
  'MATES DEP': [WP_DICT_Rwy33s.IKLEN, WP_DICT_Rwy33s.TONNY],
  'MAVAN DEP': [
    WP_DICT_Rwy33s.NUBAN,
    WP_DICT_Rwy33s.IGTUL,
    WP_DICT_Rwy33s.RIKEM,
    WP_DICT_Rwy33s.KEPTA,
  ],
  'MIXUT DEP': [
    WP_DICT_Rwy33s.NUBAX,
    WP_DICT_Rwy33s.TANGU,
    WP_DICT_Rwy33s.MIXUT,
    WP_DICT_Rwy33s.LETOR,
  ],
  'NOSIK DEP': [WP_DICT_Rwy33s.URSAL, WP_DICT_Rwy33s.NOSIK],
  'NUGOP DEP': [WP_DICT_Rwy33s.AVSEP, WP_DICT_Rwy33s.NUGOP],
  'OAKVL DEP': [
    WP_DICT_Rwy33s.SERPI,
    WP_DICT_Rwy33s.OAKVL,
    WP_DICT_Rwy33s.BETES,
  ],
  'PEMBA DEP': [
    WP_DICT_Rwy33s.SERPI,
    WP_DICT_Rwy33s.MIXUT,
    WP_DICT_Rwy33s.LETOR,
  ],
  'PERLO DEP': [
    WP_DICT_Rwy33s.SERPI,
    WP_DICT_Rwy33s.MIXUT,
    WP_DICT_Rwy33s.LETOR,
  ],
  'RIGUS DEP': [
    WP_DICT_Rwy33s.NUBAX,
    WP_DICT_Rwy33s.TANGU,
    WP_DICT_Rwy33s.DUSOM,
    WP_DICT_Rwy33s.RIGUS,
  ],
  'SEDOG DEP': [WP_DICT_Rwy33s.SEDOG, WP_DICT_Rwy33s.TANGI],
  'TEVAD DEP': [
    WP_DICT_Rwy33s.NUBAN,
    WP_DICT_Rwy33s.IGTUL,
    WP_DICT_Rwy33s.NADUM,
    WP_DICT_Rwy33s.TEVAD,
  ],
  'TULEK DEP': [WP_DICT_Rwy33s.TULEK],
  'URSAL DEP': [
    WP_DICT_Rwy33s.TETAD,
    WP_DICT_Rwy33s.URSAL,
    WP_DICT_Rwy33s.NOSIK,
  ],
  'VERDO DEP': [
    WP_DICT_Rwy33s.VIVET,
    WP_DICT_Rwy33s.DUVAK,
    WP_DICT_Rwy33s.VERDO,
  ],
};
