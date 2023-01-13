import Plane from './Plane/Plane';
import { ColorKeys } from '../types/ColorKeys';
import RadarScene from '../scenes/RadarScene';
import { AssetKeys } from '../types/AssetKeys';

export default class FiledRouteLine extends Phaser.GameObjects.Polygon {
  private Scene: RadarScene;
  private Plane: Plane | null;
  private WaypointNames: Phaser.GameObjects.BitmapText[];

  constructor(plane: Plane) {
    // Pre-super Setup
    const filedRoute = plane.getFiledRoute();

    const startPoint = plane.Scene.RunwayOrigins.getOrigin(
      plane.Properties.takeoffData.depRunway
    );
    const routePoints = filedRoute.map((wp) => wp.getDisplayCoord());

    const finalPoints = [startPoint, ...routePoints];

    // Super
    super(plane.scene, 0, 0, finalPoints);
    this.Scene = plane.Scene;
    this.Plane = plane;
    this.WaypointNames = [];

    // Common setup
    this.scene.add.existing(this);

    this.setStrokeStyle(2, ColorKeys.PPS_YELLOW);
    this.setOrigin(0, 0);
    this.setClosePath(false);

    // Setup: Waypoint Names
    filedRoute.forEach((wp) => {
      const wpNameText = new Phaser.GameObjects.BitmapText(
        plane.scene,
        wp.getDisplayCoord().x,
        wp.getDisplayCoord().y + 10,
        AssetKeys.FONT_DEJAVU_MONO_BOLD,
        wp.name
      );

      wpNameText.addToDisplayList();
      wpNameText.setOrigin(0.5, 0.5);
      wpNameText.setFontSize(16);

      this.WaypointNames.push(wpNameText);
    });
  }

  public customDestroy() {
    this.WaypointNames.forEach((wpName) => wpName.destroy());
    this.destroy();
  }
}
