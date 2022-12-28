import Phaser from 'phaser';

import { AssetKeys } from '../../types/AssetKeys';
import { convertHeadingToRadians } from '../../utils/convertHeadingToRadians';
import { asKnots } from '../../utils/asKnots';
import Plane from './Plane';
import { DomEvents } from '../../types/DomEvents';

export default class PlaneSymbol extends Phaser.GameObjects.Image {
  private Plane: Plane;

  constructor(plane: Plane) {
    super(plane.scene, 0, 0, AssetKeys.PPS_SYMBOL);

    // Common setup
    this.Plane = plane;
    plane.scene.add.existing(this);

    // Init properties
    this.setDepth(10);
    this.setScale(0.2);

    // Enable physics on the Plane object
    // this.scene.physics.add.existing(this);

    // Config the physics body
    // const body = this.body as Phaser.Physics.Arcade.Body;
    // body.setCollideWorldBounds(true);
    // body.setSize(this.displayWidth + 2, this.displayHeight + 2);

    /* -------------------------- Init Events -------------------------- */
    this.setInteractive();
    plane.scene.input.enableDebug(this);

    this.on(DomEvents.PointerDown, () => {
      this.Plane.togglePTL();
    });
  }
}
