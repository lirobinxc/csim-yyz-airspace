import { SidRoute06s } from '../config/Rwy06sSidConfig';
import RadarScene from '../scenes/RadarScene';
import { RadarSceneKeys } from '../types/SceneKeys';
import { SidName } from '../types/SidAndSatelliteTypes';

export function getSidRoute(runwayConfig: RadarSceneKeys, sidName: SidName) {
  switch (runwayConfig) {
    case RadarSceneKeys.RADAR_06s:
      return SidRoute06s[sidName];
    default:
      throw new Error(`Could not get SID Route for scene: ${runwayConfig}`);
  }
}
