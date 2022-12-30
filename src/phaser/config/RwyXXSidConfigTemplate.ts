import { Rwy06sWaypointDict } from './Rwy06sWaypointConfig';
import { WaypointData06s } from '../types/WaypointTypes';
import { SidName } from '../types/SidTypes';

// export const SidRoute06s: {
//   [key in SidName]: WaypointData06s[];
// } = {
//   'ANCOL DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'AVSEP DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'BETES DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'BOMET DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'DEDKI DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'DUSOM DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'EBKIN DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'GOPUP DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'IKLEN DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'KEPTA DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'KISEP DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'LAKES DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'MATES DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'MAVAN DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'MIXUT DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'NOSIK DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'NUGOP DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'OAKVL DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'PEMBA DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'PERLO DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'RIGUS DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'SEDOG DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'TEVAD DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'TULEK DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'URSAL DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
//   'VERDO DEP': [
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//     Rwy06sWaypointDict,
//   ],
// };
