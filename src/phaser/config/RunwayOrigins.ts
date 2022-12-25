import Phaser from 'phaser';

/**
 * Returns Vector2 properties for each
 * runway's origin. Call this object
 * in the init() phase or later.
 *
 * @date 12/24/2022 - 3:14:41 PM
 *
 * @export
 * @class RunwayOrigins
 * @typedef {RunwayOrigins}
 */

interface Options {
  isDebug: boolean;
}

export default class RunwayOrigins {
  private scene: Phaser.Scene;

  public Rwy05_23: Phaser.Math.Vector2;
  public Rwy06L_24R: Phaser.Math.Vector2;
  public Rwy15L_33R: Phaser.Math.Vector2;
  public Rwy33L_15R: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene, { isDebug = false }: Options) {
    this.scene = scene;

    const cameraHeight = scene.cameras.main.height;

    // Property Setup: runway origins
    const RWY_05_23_RELATIVE_ORIGIN_X = 0.487;
    const RWY_05_23_RELATIVE_ORIGIN_Y = 0.489;

    const RWY_06L_24R_RELATIVE_ORIGIN_X = 0.513;
    const RWY_06L_24R_RELATIVE_ORIGIN_Y = 0.51;

    const RWY_15L_33R_RELATIVE_ORIGIN_X = 0.492;
    const RWY_15L_33R_RELATIVE_ORIGIN_Y = 0.499;

    const RWY_33L_15R_RELATIVE_ORIGIN_X = 0.503;
    const RWY_33L_15R_RELATIVE_ORIGIN_Y = 0.497;

    const Rwy05_23ActualOriginX = RWY_05_23_RELATIVE_ORIGIN_X * cameraHeight;
    const Rwy05_23ActualOriginY = RWY_05_23_RELATIVE_ORIGIN_Y * cameraHeight;

    const Rwy06L_24RActualOriginX =
      RWY_06L_24R_RELATIVE_ORIGIN_X * cameraHeight;
    const Rwy06L_24RActualOriginY =
      RWY_06L_24R_RELATIVE_ORIGIN_Y * cameraHeight;

    const Rwy15L_33RActualOriginX =
      RWY_15L_33R_RELATIVE_ORIGIN_X * cameraHeight;
    const Rwy15L_33RActualOriginY =
      RWY_15L_33R_RELATIVE_ORIGIN_Y * cameraHeight;

    const Rwy33L_15RActualOriginX =
      RWY_33L_15R_RELATIVE_ORIGIN_X * cameraHeight;
    const Rwy33L_15RActualOriginY =
      RWY_33L_15R_RELATIVE_ORIGIN_Y * cameraHeight;

    this.Rwy05_23 = new Phaser.Math.Vector2(
      Rwy05_23ActualOriginX,
      Rwy05_23ActualOriginY
    );
    this.Rwy06L_24R = new Phaser.Math.Vector2(
      Rwy06L_24RActualOriginX,
      Rwy06L_24RActualOriginY
    );
    this.Rwy15L_33R = new Phaser.Math.Vector2(
      Rwy15L_33RActualOriginX,
      Rwy15L_33RActualOriginY
    );
    this.Rwy33L_15R = new Phaser.Math.Vector2(
      Rwy33L_15RActualOriginX,
      Rwy33L_15RActualOriginY
    );

    if (isDebug) {
      this.debug();
    }
  }

  debug() {
    const CIRCLE_RADIUS = 2;
    const CIRCLE_COLOR = 0xff0000;
    const CIRCLE_DEPTH = 999;

    this.scene.add
      .circle(this.Rwy05_23.x, this.Rwy05_23.y, CIRCLE_RADIUS, CIRCLE_COLOR)
      .setDepth(CIRCLE_DEPTH);
    this.scene.add
      .circle(this.Rwy06L_24R.x, this.Rwy06L_24R.y, CIRCLE_RADIUS, CIRCLE_COLOR)
      .setDepth(CIRCLE_DEPTH);
    this.scene.add
      .circle(this.Rwy15L_33R.x, this.Rwy15L_33R.y, CIRCLE_RADIUS, CIRCLE_COLOR)
      .setDepth(CIRCLE_DEPTH);
    this.scene.add
      .circle(this.Rwy33L_15R.x, this.Rwy33L_15R.y, CIRCLE_RADIUS, CIRCLE_COLOR)
      .setDepth(CIRCLE_DEPTH);
  }
}
