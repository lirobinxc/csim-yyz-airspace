import { GameObjectOptions } from '../types/GameObjectOptions';
import { OtherSceneKeys, RadarSceneKeys } from '../types/SceneKeys';

export default class PreloadScene extends Phaser.Scene {
  private RadarScene;
  private Options;

  constructor(radarScene: RadarSceneKeys, options: GameObjectOptions) {
    super(OtherSceneKeys.PRELOADER);
    this.RadarScene = radarScene;
    this.Options = options;
  }

  preload() {}

  create() {
    this.scene.start(this.RadarScene);
  }
}
