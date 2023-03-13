import Plane from '../objects/Plane/Plane';
import { RadarSceneKeys } from '../types/SceneKeys';

export const ArrBoxDimensions: {
  [key in RadarSceneKeys]: Phaser.Geom.Polygon; // start @ TopLeft, move CLOCKWISE
} = {
  Radar06sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(36.0, 663.0),
    new Phaser.Math.Vector2(428.0, 415.0),
    new Phaser.Math.Vector2(594.0, 706.0),
    new Phaser.Math.Vector2(217.0, 945.0),
  ]),
  Radar15sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(427.0, 31.0),
    new Phaser.Math.Vector2(629.0, 373.0),
    new Phaser.Math.Vector2(339.0, 508.0),
    new Phaser.Math.Vector2(148.0, 196.0),
  ]),
  Radar24sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(519.0, 356.0),
    new Phaser.Math.Vector2(890.0, 132.0),
    new Phaser.Math.Vector2(1066.0, 407.0),
    new Phaser.Math.Vector2(656.0, 664.0),
  ]),
  Radar33sScene: new Phaser.Geom.Polygon([
    new Phaser.Math.Vector2(452.0, 669.0),
    new Phaser.Math.Vector2(713.0, 561.0),
    new Phaser.Math.Vector2(922.0, 887.0),
    new Phaser.Math.Vector2(694.0, 1036.0),
  ]),
};

export function isPlaneInsideArrBox(plane: Plane) {
  const radarScene = plane.Scene.SCENE_KEY;
  const planePosition = plane.getPosition();

  return ArrBoxDimensions[radarScene].contains(
    planePosition.x,
    planePosition.y
  );
}
