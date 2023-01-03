import { RadarSceneKeys } from '../types/SceneKeys';
import RadarScene from './RadarScene';

export default class Radar06sScene extends RadarScene {
  constructor() {
    super(RadarSceneKeys.RADAR_06s, { isDebug: false });
  }
}
