import Plane from './Plane';
import { getSidRoute } from '../../utils/getSidRoute';
import { ColorKeys } from '../../types/ColorKeys';

export default class PlaneRouteLine extends Phaser.GameObjects.Line {
  public IS_VISIBLE: boolean;

  constructor(plane: Plane) {
    const sidRoute = getSidRoute(
      plane.Scene.RUNWAY_CONFIG,
      plane.Properties.filedData.sidName
    );

    const points = sidRoute.map((wp) => wp.getDisplayCoord());
    console.log({ points });

    super(plane.scene, 0, 0);

    // Common setup
    this.scene.add.existing(this);
    this.IS_VISIBLE = true;

    this.setStrokeStyle(5, ColorKeys.PPS_YELLOW);
    this.setTo(points[0].x, points[0].y, points[1].x, points[1].y);
  }
}
