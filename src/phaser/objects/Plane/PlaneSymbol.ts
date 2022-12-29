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

    // Setup: THIS
    this.setDepth(10);
    this.setScale(0.2);
    this.setInteractive();

    // Input: On click
    this.on(DomEvents.PointerDown, () => {
      this.Plane.togglePTL();
    });

    // Setup: Debug
    this.Plane.scene.input.enableDebug(this);
  }

  preUpdate() {
    // Debug
    if (this.Plane.Options.isDebug) {
      this.input.hitAreaDebug.setVisible(true);
    } else {
      this.input.hitAreaDebug.setVisible(false);
    }
  }
}
