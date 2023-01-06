import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { SidName } from '../../phaser/types/SidAndSatelliteTypes';

export function determineIfVdpAllowed(
  radarScene: RadarSceneKeys,
  currFdeSidName: SidName,
  prevFdeSidName: SidName | undefined
) {
  if (!prevFdeSidName) return false;

  if (
    sameSidsNorthbound.includes(currFdeSidName) &&
    sameSidsNorthbound.includes(prevFdeSidName)
  ) {
    return false;
  }

  if (
    radarScene === RadarSceneKeys.RADAR_06s &&
    sameSidsSouthbound06s.includes(currFdeSidName) &&
    sameSidsSouthbound06s.includes(prevFdeSidName)
  ) {
    return false;
  }

  if (
    sameSidsSouthbound.includes(currFdeSidName) &&
    sameSidsSouthbound.includes(prevFdeSidName)
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
