import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { SidName } from '../../phaser/types/SidAndSatelliteTypes';
import { DeparturePosition } from './genDepFdeData';

export function determineIfNorthOrSouthDep(
  radarScene: RadarSceneKeys,
  sidName: SidName
): DeparturePosition {
  if (
    radarScene === RadarSceneKeys.RADAR_15s ||
    radarScene === RadarSceneKeys.RADAR_33s
  ) {
    return DeparturePosition.SD;
  }

  if (radarScene === RadarSceneKeys.RADAR_06s) {
    const rwy06sNorthDepSids = [
      SidName.BOMET,
      SidName.SEDOG,
      SidName.LAKES,
      SidName.IKLEN,
      SidName.MATES,
      SidName.KISEP,
      SidName.EBKIN,
      SidName.AVSEP,
      SidName.NUGOP,
      SidName.URSAL,
      SidName.NOSIK,
      SidName.GOPUP,
      SidName.TULEK,
    ];

    const rwy06sSouthDepSids = [
      SidName.VERDO,
      SidName.DEDKI,
      SidName.TEVAD,
      SidName.KEPTA,
      SidName.MAVAN,
      SidName.RIGUS,
      SidName.DUSOM,
      SidName.BETES,
      SidName.OAKVL,
      SidName.ANCOL,
      SidName.PERLO,
      SidName.MIXUT,
      SidName.PEMBA,
    ];

    if (rwy06sNorthDepSids.includes(sidName)) {
      return DeparturePosition.ND;
    }
    if (rwy06sSouthDepSids.includes(sidName)) {
      return DeparturePosition.SD;
    }
  }

  if (radarScene === RadarSceneKeys.RADAR_24s) {
    const rwy24sNorthDepSids = [
      SidName.SEDOG,
      SidName.LAKES,
      SidName.IKLEN,
      SidName.MATES,
      SidName.KISEP,
      SidName.EBKIN,
      SidName.AVSEP,
      SidName.NUGOP,
      SidName.URSAL,
      SidName.NOSIK,
      SidName.GOPUP,
      SidName.TULEK,
      SidName.ANCOL,
      SidName.PERLO,
      SidName.MIXUT,
      SidName.PEMBA,
    ];

    const rwy24sSouthDepSids = [
      SidName.BOMET,
      SidName.VERDO,
      SidName.DEDKI,
      SidName.TEVAD,
      SidName.KEPTA,
      SidName.MAVAN,
      SidName.RIGUS,
      SidName.DUSOM,
      SidName.BETES,
      SidName.OAKVL,
    ];

    if (rwy24sNorthDepSids.includes(sidName)) {
      return DeparturePosition.ND;
    }
    if (rwy24sSouthDepSids.includes(sidName)) {
      return DeparturePosition.SD;
    }
  }

  throw new Error(`Could not determine the DeparturePosition for ${sidName}`);
}
