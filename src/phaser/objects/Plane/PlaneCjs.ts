import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import Plane from './Plane';

export default class PlaneCjs extends Phaser.GameObjects.BitmapText {
  private Plane: Plane;

  constructor(plane: Plane) {
    super(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      plane.Properties.handoffData.sector
    );
    this.scene.add.existing(this);
    this.Plane = plane;

    const FONT_SIZE = 14;
    // Setup
    this.setFontSize(FONT_SIZE);
    this.setTint(ColorKeys.PPS_YELLOW);
    this.setOrigin(0.5, 0);
    this.setPosition(0, FONT_SIZE / 2);
  }

  preUpdate() {
    this.setVisible(this.Plane.IS_HANDED_OFF);
  }
}
