import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { SidName } from '../../phaser/types/SidAndSatelliteTypes';
import { DepFDE } from './genDepFdeData';

export function determineIfVdpAllowed(
  radarScene: RadarSceneKeys,
  currFde: DepFDE,
  prevFde: DepFDE | undefined
) {
  if (!prevFde) return false;

  if (
    sameSidsNorthbound.includes(currFde.sidName) &&
    sameSidsNorthbound.includes(prevFde.sidName)
  ) {
    return false;
  }

  if (
    radarScene === RadarSceneKeys.RADAR_06s &&
    sameSidsSouthbound06s.includes(currFde.sidName) &&
    sameSidsSouthbound06s.includes(prevFde.sidName)
  ) {
    return false;
  }

  if (
    sameSidsSouthbound.includes(currFde.sidName) &&
    sameSidsSouthbound.includes(prevFde.sidName)
  ) {
    return false;
  }

  return true;
}

const sameSidsNorthbound = [
  SidName.KISEP,
  SidName.IKLEN,
  SidName.SEDOG,
  SidName.MATES,
  SidName.LAKES,
  SidName.EBKIN,
];

const sameSidsSouthbound = [
  SidName.MIXUT,
  SidName.ANCOL,
  SidName.PERLO,
  SidName.PEMBA,
];
const sameSidsSouthbound06s = [
  SidName.MIXUT,
  SidName.ANCOL,
  SidName.PERLO,
  SidName.PEMBA,
  SidName.OAKVL,
  SidName.DUSOM,
  SidName.BETES,
  SidName.RIGUS,
];
