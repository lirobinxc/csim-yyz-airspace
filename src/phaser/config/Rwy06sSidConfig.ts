import { Rwy06sWaypointDict } from './Rwy06sWaypointConfig';
import { WaypointData06s } from '../types/WaypointTypes';
import { SidName } from '../types/SidAndSatelliteTypes';

export const SidRoute06s: {
  [key in SidName]: WaypointData06s[];
} = {
  'ANCOL DEP': [
    Rwy06sWaypointDict.MOBEL,
    Rwy06sWaypointDict.BIRLI,
    Rwy06sWaypointDict.VIDRA,
    Rwy06sWaypointDict.ANCOL,
    Rwy06sWaypointDict.LETOR,
  ],
  'AVSEP DEP': [
    Rwy06sWaypointDict.KEDSI,
    Rwy06sWaypointDict.DUVKO,
    Rwy06sWaypointDict.AVSEP,
    Rwy06sWaypointDict.NUGOP,
  ],
  'BETES DEP': [
    Rwy06sWaypointDict.MOBEL,
    Rwy06sWaypointDict.BIRLI,
    Rwy06sWaypointDict.VIDRA,
    Rwy06sWaypointDict.OAKVL,
    Rwy06sWaypointDict.BETES,
  ],
  'BOMET DEP': [Rwy06sWaypointDict.AVROS, Rwy06sWaypointDict.TESUK],
  'DEDKI DEP': [
    Rwy06sWaypointDict.ALKUT,
    Rwy06sWaypointDict.KODAL,
    Rwy06sWaypointDict.DEDKI,
  ],
  'DUSOM DEP': [
    Rwy06sWaypointDict.PERLO,
    Rwy06sWaypointDict.OMAPA,
    Rwy06sWaypointDict.DUSOM,
    Rwy06sWaypointDict.RIGUS,
  ],
  'EBKIN DEP': [Rwy06sWaypointDict.EBKIN, Rwy06sWaypointDict.KISEP],
  'GOPUP DEP': [
    Rwy06sWaypointDict.KEDSI,
    Rwy06sWaypointDict.DUVKO,
    Rwy06sWaypointDict.TULEK,
  ],
  'IKLEN DEP': [
    Rwy06sWaypointDict.GOTIM,
    Rwy06sWaypointDict.IKLEN,
    Rwy06sWaypointDict.TONNY,
  ],
  'KEPTA DEP': [
    Rwy06sWaypointDict.MOBEL,
    Rwy06sWaypointDict.RIKEM,
    Rwy06sWaypointDict.KEPTA,
  ],
  'KISEP DEP': [
    Rwy06sWaypointDict.GOTIM,
    Rwy06sWaypointDict.EBKIN,
    Rwy06sWaypointDict.KISEP,
  ],
  'LAKES DEP': [Rwy06sWaypointDict.SEDOG, Rwy06sWaypointDict.TANGI],
  'MATES DEP': [Rwy06sWaypointDict.IKLEN, Rwy06sWaypointDict.TONNY],
  'MAVAN DEP': [Rwy06sWaypointDict.PERLO, Rwy06sWaypointDict.RIKEM],
  'MIXUT DEP': [
    Rwy06sWaypointDict.MOBEL,
    Rwy06sWaypointDict.BIRLI,
    Rwy06sWaypointDict.VIDRA,
    Rwy06sWaypointDict.ANCOL,
    Rwy06sWaypointDict.LETOR,
  ],
  'NOSIK DEP': [
    Rwy06sWaypointDict.MEMPA,
    Rwy06sWaypointDict.SIDVU,
    Rwy06sWaypointDict.URSAL,
    Rwy06sWaypointDict.NOSIK,
  ],
  'NUGOP DEP': [
    Rwy06sWaypointDict.MEMPA,
    Rwy06sWaypointDict.SIDVU,
    Rwy06sWaypointDict.AVSEP,
    Rwy06sWaypointDict.NUGOP,
  ],
  'OAKVL DEP': [
    Rwy06sWaypointDict.PERLO,
    Rwy06sWaypointDict.OMAPA,
    Rwy06sWaypointDict.OAKVL,
    Rwy06sWaypointDict.BETES,
  ],
  'PEMBA DEP': [
    Rwy06sWaypointDict.PERLO,
    Rwy06sWaypointDict.OMAPA,
    Rwy06sWaypointDict.ANCOL,
    Rwy06sWaypointDict.LETOR,
  ],
  'PERLO DEP': [
    Rwy06sWaypointDict.PERLO,
    Rwy06sWaypointDict.OMAPA,
    Rwy06sWaypointDict.ANCOL,
    Rwy06sWaypointDict.LETOR,
  ],
  'RIGUS DEP': [
    Rwy06sWaypointDict.MOBEL,
    Rwy06sWaypointDict.BIRLI,
    Rwy06sWaypointDict.VIDRA,
    Rwy06sWaypointDict.DUSOM,
    Rwy06sWaypointDict.RIGUS,
  ],
  'SEDOG DEP': [
    Rwy06sWaypointDict.GOTIM,
    Rwy06sWaypointDict.SEDOG,
    Rwy06sWaypointDict.TANGI,
  ],
  'TEVAD DEP': [
    Rwy06sWaypointDict.PERLO,
    Rwy06sWaypointDict.NADUM,
    Rwy06sWaypointDict.TEVAD,
  ],
  'TULEK DEP': [
    Rwy06sWaypointDict.MEMPA,
    Rwy06sWaypointDict.SIDVU,
    Rwy06sWaypointDict.TULEK,
  ],
  'URSAL DEP': [
    Rwy06sWaypointDict.KEDSI,
    Rwy06sWaypointDict.DUVKO,
    Rwy06sWaypointDict.URSAL,
    Rwy06sWaypointDict.NOSIK,
  ],
  'VERDO DEP': [
    Rwy06sWaypointDict.ALKUT,
    Rwy06sWaypointDict.PUTON,
    Rwy06sWaypointDict.VERDO,
  ],
};
