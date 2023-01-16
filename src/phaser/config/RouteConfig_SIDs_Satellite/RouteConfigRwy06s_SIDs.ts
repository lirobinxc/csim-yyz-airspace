import { WP_DICT_Rwy06s } from '../WaypointConfig_Dep/WaypointConfigRwy06s_Dep';
import { WaypointData06sDep } from '../../types/WaypointTypesDep';
import { SidName } from '../../types/SidAndSatelliteTypes';

export const SID_ROUTES_06s: {
  [key in SidName]: WaypointData06sDep[];
} = {
  'ANCOL DEP': [
    WP_DICT_Rwy06s.MOBEL,
    WP_DICT_Rwy06s.BIRLI,
    WP_DICT_Rwy06s.VIDRA,
    WP_DICT_Rwy06s.ANCOL,
    WP_DICT_Rwy06s.LETOR,
  ],
  'AVSEP DEP': [
    WP_DICT_Rwy06s.KEDSI,
    WP_DICT_Rwy06s.DUVKO,
    WP_DICT_Rwy06s.AVSEP,
    WP_DICT_Rwy06s.NUGOP,
  ],
  'BETES DEP': [
    WP_DICT_Rwy06s.MOBEL,
    WP_DICT_Rwy06s.BIRLI,
    WP_DICT_Rwy06s.VIDRA,
    WP_DICT_Rwy06s.OAKVL,
    WP_DICT_Rwy06s.BETES,
  ],
  'BOMET DEP': [WP_DICT_Rwy06s.AVROS, WP_DICT_Rwy06s.TESUK],
  'DEDKI DEP': [
    WP_DICT_Rwy06s.ALKUT,
    WP_DICT_Rwy06s.KODAL,
    WP_DICT_Rwy06s.DEDKI,
  ],
  'DUSOM DEP': [
    WP_DICT_Rwy06s.PERLO,
    WP_DICT_Rwy06s.OMAPA,
    WP_DICT_Rwy06s.DUSOM,
    WP_DICT_Rwy06s.RIGUS,
  ],
  'EBKIN DEP': [WP_DICT_Rwy06s.EBKIN, WP_DICT_Rwy06s.KISEP],
  'GOPUP DEP': [
    WP_DICT_Rwy06s.KEDSI,
    WP_DICT_Rwy06s.DUVKO,
    WP_DICT_Rwy06s.TULEK,
  ],
  'IKLEN DEP': [
    WP_DICT_Rwy06s.GOTIM,
    WP_DICT_Rwy06s.IKLEN,
    WP_DICT_Rwy06s.TONNY,
  ],
  'KEPTA DEP': [
    WP_DICT_Rwy06s.MOBEL,
    WP_DICT_Rwy06s.RIKEM,
    WP_DICT_Rwy06s.KEPTA,
  ],
  'KISEP DEP': [
    WP_DICT_Rwy06s.GOTIM,
    WP_DICT_Rwy06s.EBKIN,
    WP_DICT_Rwy06s.KISEP,
  ],
  'LAKES DEP': [WP_DICT_Rwy06s.SEDOG, WP_DICT_Rwy06s.TANGI],
  'MATES DEP': [WP_DICT_Rwy06s.IKLEN, WP_DICT_Rwy06s.TONNY],
  'MAVAN DEP': [
    WP_DICT_Rwy06s.PERLO,
    WP_DICT_Rwy06s.RIKEM,
    WP_DICT_Rwy06s.KEPTA,
  ],
  'MIXUT DEP': [
    WP_DICT_Rwy06s.MOBEL,
    WP_DICT_Rwy06s.BIRLI,
    WP_DICT_Rwy06s.VIDRA,
    WP_DICT_Rwy06s.ANCOL,
    WP_DICT_Rwy06s.LETOR,
  ],
  'NOSIK DEP': [
    WP_DICT_Rwy06s.MEMPA,
    WP_DICT_Rwy06s.SIDVU,
    WP_DICT_Rwy06s.URSAL,
    WP_DICT_Rwy06s.NOSIK,
  ],
  'NUGOP DEP': [
    WP_DICT_Rwy06s.MEMPA,
    WP_DICT_Rwy06s.SIDVU,
    WP_DICT_Rwy06s.AVSEP,
    WP_DICT_Rwy06s.NUGOP,
  ],
  'OAKVL DEP': [
    WP_DICT_Rwy06s.PERLO,
    WP_DICT_Rwy06s.OMAPA,
    WP_DICT_Rwy06s.OAKVL,
    WP_DICT_Rwy06s.BETES,
  ],
  'PEMBA DEP': [
    WP_DICT_Rwy06s.PERLO,
    WP_DICT_Rwy06s.OMAPA,
    WP_DICT_Rwy06s.ANCOL,
    WP_DICT_Rwy06s.LETOR,
  ],
  'PERLO DEP': [
    WP_DICT_Rwy06s.PERLO,
    WP_DICT_Rwy06s.OMAPA,
    WP_DICT_Rwy06s.ANCOL,
    WP_DICT_Rwy06s.LETOR,
  ],
  'RIGUS DEP': [
    WP_DICT_Rwy06s.MOBEL,
    WP_DICT_Rwy06s.BIRLI,
    WP_DICT_Rwy06s.VIDRA,
    WP_DICT_Rwy06s.DUSOM,
    WP_DICT_Rwy06s.RIGUS,
  ],
  'SEDOG DEP': [
    WP_DICT_Rwy06s.GOTIM,
    WP_DICT_Rwy06s.SEDOG,
    WP_DICT_Rwy06s.TANGI,
  ],
  'TEVAD DEP': [
    WP_DICT_Rwy06s.PERLO,
    WP_DICT_Rwy06s.NADUM,
    WP_DICT_Rwy06s.TEVAD,
  ],
  'TULEK DEP': [
    WP_DICT_Rwy06s.MEMPA,
    WP_DICT_Rwy06s.SIDVU,
    WP_DICT_Rwy06s.TULEK,
  ],
  'URSAL DEP': [
    WP_DICT_Rwy06s.KEDSI,
    WP_DICT_Rwy06s.DUVKO,
    WP_DICT_Rwy06s.URSAL,
    WP_DICT_Rwy06s.NOSIK,
  ],
  'VERDO DEP': [
    WP_DICT_Rwy06s.ALKUT,
    WP_DICT_Rwy06s.PUTON,
    WP_DICT_Rwy06s.VERDO,
  ],
};
