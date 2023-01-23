import Phaser from 'phaser';

import { AssetKeys } from '../../types/AssetKeys';
import Plane from './Plane';
import { ColorKeys } from '../../types/ColorKeys';

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
    this.input.cursor = 'pointer';

    // Input: On click
    // this.on(DomEvents.POINTER_DOWN, () => {
    //   this.Plane.togglePTL();
    // });

    // Setup: Debug
    this.Plane.scene.input.enableDebug(this);
  }

  preUpdate() {
    this.ifPlaneIsSelected();

    // Debug
    if (this.Plane.Scene.IS_DEBUG_MODE) {
      this.input.hitAreaDebug.setVisible(true);
    } else {
      this.input.hitAreaDebug.setVisible(false);
    }
  }

  private ifPlaneIsSelected() {
    if (this.Plane.IS_SELECTED) {
      this.setTint(ColorKeys.PTL_GREEN);
    } else {
      this.clearTint();
    }
  }
}
