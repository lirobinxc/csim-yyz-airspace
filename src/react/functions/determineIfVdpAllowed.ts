import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { SidName } from '../../phaser/types/SidTypes';
import { DepFDE } from './genDepFdeData';

export function determineIfVdpAllowed(
  radarScene: RadarSceneKeys,
  currDepFde: DepFDE,
  prevDepFde: DepFDE
) {
  if (
    sameSidsNorthbound.includes(currDepFde.sidName) &&
    sameSidsNorthbound.includes(prevDepFde.sidName)
  ) {
    return false;
  }

  if (
    radarScene === RadarSceneKeys.RADAR_06s &&
    sameSidsSouthbound06s.includes(currDepFde.sidName) &&
    sameSidsSouthbound06s.includes(prevDepFde.sidName)
  ) {
    return false;
  }

  if (
    sameSidsSouthbound.includes(currDepFde.sidName) &&
    sameSidsSouthbound.includes(prevDepFde.sidName)
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
