import Plane from '../objects/Plane/Plane';
import { RadarSceneKeys } from '../types/SceneKeys';

export const ArrBoxDimensions: {
  [key in RadarSceneKeys]: Phaser.Geom.Polygon; // start @ TopLeft, move CLOCKWISE
} = {
  Radar06sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(66.68, 653.63),
    new Phaser.Math.Vector2(439.84, 419.55),
    new Phaser.Math.Vector2(600.28, 686.96),
    new Phaser.Math.Vector2(236.06, 920.25),
  ]),
  Radar15sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(),
    new Phaser.Math.Vector2(),
    new Phaser.Math.Vector2(),
    new Phaser.Math.Vector2(),
  ]),
  Radar24sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(505.25, 375.65),
    new Phaser.Math.Vector2(866.77, 152.15),
    new Phaser.Math.Vector2(1030.9, 414.94),
    new Phaser.Math.Vector2(641.43, 662.09),
  ]),
  Radar33sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(),
    new Phaser.Math.Vector2(),
    new Phaser.Math.Vector2(),
    new Phaser.Math.Vector2(),
  ]),
};

export function isPlaneInsideArrBox(plane: Plane) {
  const radarScene = plane.Scene.SCENE_KEY;
  const planePosition = plane.getPosition();

  switch (radarScene) {
    case RadarSceneKeys.RADAR_06s:
      return ArrBoxDimensions[radarScene].contains(
        planePosition.x,
        planePosition.y
      );

    //WIP TODO
  }

  //DELETE ME
  return ArrBoxDimensions[radarScene].contains(
    planePosition.x,
    planePosition.y
  );
}
