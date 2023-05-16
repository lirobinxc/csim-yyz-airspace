import { ArrBedpost } from '../../react/functions/arrival/genArrRoute';
import { MasterEngineOptions } from '../MasterEngineOptions';
import RadarScene from '../scenes/RadarScene';
import { RadarSceneKeys } from '../types/SceneKeys';

export function getBedpostOrigin(
  arrBedpost: ArrBedpost,
  radarScene: RadarScene
) {
  let relativeBedpostOrigins = {
    [ArrBedpost.BOXUM]: new Phaser.Math.Vector2(0.24, 0),
    [ArrBedpost.NUBER]: new Phaser.Math.Vector2(-0.02, 0.605),
    [ArrBedpost.LINNG]: new Phaser.Math.Vector2(0.634, 1),
    [ArrBedpost.IMEBA]: new Phaser.Math.Vector2(1, 0.032),
    [ArrBedpost.RAGID]: new Phaser.Math.Vector2(1, 0.314),
  };

  if (radarScene.SCENE_KEY === RadarSceneKeys.RADAR_24s) {
    relativeBedpostOrigins = {
      ...relativeBedpostOrigins,
      [ArrBedpost.IMEBA]: new Phaser.Math.Vector2(1, 0.009),
      [ArrBedpost.RAGID]: new Phaser.Math.Vector2(1, 0.368),
    };
  }
  if (
    radarScene.SCENE_KEY === RadarSceneKeys.RADAR_33s ||
    radarScene.SCENE_KEY === RadarSceneKeys.RADAR_15s
  ) {
    relativeBedpostOrigins = {
      ...relativeBedpostOrigins,
      [ArrBedpost.IMEBA]: new Phaser.Math.Vector2(1, 0.091),
      [ArrBedpost.RAGID]: new Phaser.Math.Vector2(1, 0.23),
    };
  }

  return relativeBedpostOrigins[arrBedpost].scale(MasterEngineOptions.height);
}
