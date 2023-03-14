import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { TerminalSectors } from '../../types/SectorTypes';
import { TerminalPosition } from '../../types/SimTypes';
import Plane from './Plane';

export default class PlaneCjs extends Phaser.GameObjects.BitmapText {
  private Plane: Plane;

  constructor(plane: Plane) {
    super(plane.scene, 0, 0, AssetKeys.FONT_DEJAVU_MONO_BOLD, 'SD');
    this.scene.add.existing(this);
    this.Plane = plane;

    const FONT_SIZE = 12;
    // Setup
    this.setFontSize(FONT_SIZE);
    this.setTint(ColorKeys.PPS_YELLOW);
    this.setOrigin(0.5, 0);
    // this.setPosition(0, FONT_SIZE / 2);
    this.setPosition(0, -FONT_SIZE * 1.5);
    this.scaleY = 0.9;

    if (
      this.Plane.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL
    ) {
      this.setText(this.Plane.Properties.handoffData.sector);
    }
  }

  preUpdate() {
    if (this.Plane.IS_HANDED_OFF) {
      switch (this.Plane.Scene.SIM_OPTIONS.terminalPosition) {
        case TerminalPosition.ARRIVAL:
          this.setText(TerminalSectors.AA);
          break;
        case TerminalPosition.DEPARTURE:
          this.setText(this.Plane.Properties.handoffData.sector);
          break;
      }
    }
  }
}
