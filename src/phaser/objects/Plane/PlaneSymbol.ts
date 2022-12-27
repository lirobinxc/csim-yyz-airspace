import Phaser from 'phaser';

import { AssetKeys } from '../../types/AssetKeys';
import { convertHeadingToRadians } from '../../utils/convertHeadingToRadians';
import { asKnots } from '../../utils/asKnots';
import Plane from './Plane';

export default class PlaneSymbol extends Phaser.GameObjects.Image {
  constructor(plane: Plane) {
    super(plane.scene, 0, 0, AssetKeys.PPS_SYMBOL);

    // Init properties
    this.setDepth(10);
    this.setScale(0.2);

    plane.scene.add.existing(this);

    // Enable physics on the Plane object
    this.scene.physics.add.existing(this);
    this.updatePlaneVelocity();

    // Config the physics body
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setSize(this.displayWidth + 2, this.displayHeight + 2);

    /* -------------------------- Init Events -------------------------- */
    this.setInteractive();
    plane.scene.input.enableDebug(this);
  }

  private updatePlaneVelocity = () => {
    const PLANE_MAX_SPEED = asKnots(250);
    const PLANE_ACCEL = asKnots(10);

    const body = this.body as Phaser.Physics.Arcade.Body;

    const planeRadian = convertHeadingToRadians(57);

    this.scene.physics.velocityFromRotation(
      planeRadian,
      PLANE_MAX_SPEED,
      body.velocity
    );
  };
}
