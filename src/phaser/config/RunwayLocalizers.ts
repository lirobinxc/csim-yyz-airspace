import Plane from '../objects/Plane/Plane';
import RadarScene from '../scenes/RadarScene';
import { DepRunwayYYZ } from '../types/AirportTypes';
import { ColorKeys } from '../types/ColorKeys';
import { RadarSceneKeys } from '../types/SceneKeys';

type LocalizerDict = {
  [key in DepRunwayYYZ]: Phaser.GameObjects.Line;
};

export class RunwayLocalizers {
  public Localizers: LocalizerDict;
  public ArrRunwayList: DepRunwayYYZ[];

  constructor(radarScene: RadarScene) {
    const LocalizerConfig: {
      [key in DepRunwayYYZ]: [Phaser.Math.Vector2, Phaser.Math.Vector2];
    } = {
      'YYZ Rwy 05': [
        new Phaser.Math.Vector2(479.66, 558.79),
        new Phaser.Math.Vector2(153.2, 763.81),
      ],
      'YYZ Rwy 06L': [
        new Phaser.Math.Vector2(510.24, 581.97),
        new Phaser.Math.Vector2(182.57, 787.16),
      ],
      'YYZ Rwy 15L': [new Phaser.Math.Vector2(), new Phaser.Math.Vector2()],
      'YYZ Rwy 15R': [new Phaser.Math.Vector2(), new Phaser.Math.Vector2()],
      'YYZ Rwy 23': [new Phaser.Math.Vector2(), new Phaser.Math.Vector2()],
      'YYZ Rwy 24R': [new Phaser.Math.Vector2(), new Phaser.Math.Vector2()],
      'YYZ Rwy 33L': [new Phaser.Math.Vector2(), new Phaser.Math.Vector2()],
      'YYZ Rwy 33R': [new Phaser.Math.Vector2(), new Phaser.Math.Vector2()],
    };

    this.ArrRunwayList = Object.keys(LocalizerConfig) as DepRunwayYYZ[];

    // Init: Localizers
    this.Localizers = {} as LocalizerDict;

    // Create: Localizers
    this.ArrRunwayList.forEach((rwy) => {
      this.Localizers[rwy] = new Phaser.GameObjects.Line(
        radarScene,
        0,
        0,
        LocalizerConfig[rwy][0].x,
        LocalizerConfig[rwy][0].y,
        LocalizerConfig[rwy][1].x,
        LocalizerConfig[rwy][1].y,
        ColorKeys.DEBUG_PINK
      );

      this.Localizers[rwy].setOrigin(0, 0);
      this.Localizers[rwy].setLineWidth(0.6);
    });

    switch (radarScene.SCENE_KEY) {
      case RadarSceneKeys.RADAR_06s:
        radarScene.add.existing(this.Localizers['YYZ Rwy 05']);
        radarScene.add.existing(this.Localizers['YYZ Rwy 06L']);
        break;
      case RadarSceneKeys.RADAR_15s:
        radarScene.add.existing(this.Localizers['YYZ Rwy 15L']);
        radarScene.add.existing(this.Localizers['YYZ Rwy 15R']);
        break;
      case RadarSceneKeys.RADAR_24s:
        radarScene.add.existing(this.Localizers['YYZ Rwy 23']);
        radarScene.add.existing(this.Localizers['YYZ Rwy 24R']);
        break;
      case RadarSceneKeys.RADAR_33s:
        radarScene.add.existing(this.Localizers['YYZ Rwy 33L']);
        radarScene.add.existing(this.Localizers['YYZ Rwy 33R']);
        break;
    }
  }

  public planeHasInterceptedLocalizer(plane: Plane): boolean {
    const arrRunway = plane.Properties.arrivalData.arrRunway;

    const planePoint = new Phaser.Geom.Point(plane.x, plane.y);
    const localizerLine = this.Localizers[arrRunway].geom as Phaser.Geom.Line;

    const hasIntercepted = Phaser.Geom.Intersects.PointToLine(
      planePoint,
      localizerLine,
      2
    );

    // const distanceFromLine = Phaser.Geom.Line.GetShortestDistance(
    //   localizerLine,
    //   planePoint
    // );

    if (hasIntercepted) console.log(hasIntercepted);

    plane.ARR_HAS_INTERCEPTED_LOC = hasIntercepted;

    return hasIntercepted;
  }

  public showLines(isDebugMode: boolean) {
    this.ArrRunwayList.forEach((rwy) => {
      this.Localizers[rwy].setVisible(isDebugMode);
    });
  }
}
