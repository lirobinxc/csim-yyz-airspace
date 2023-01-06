import RadarScene from '../../scenes/RadarScene';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import { WaypointDataAll } from '../../types/WaypointTypes';
import Plane from './Plane';
import PlaneCommandSubmenu, {
  PlaneCommandSubmenuValue,
} from './PlaneCommandSubmenu';

export enum PlaneHandoffMenuButtons {
  HANDOFF = 'HANDOFF',
}

export default class PlaneHandoffMenu extends Phaser.GameObjects.Container {
  // Parent component
  private Plane: Plane;

  // Constants
  public FONT_SIZE: number;
  public FONT_TINT_COLOR: number;
  public FONT_TINT_COLOR_HOVER: number;
  // public BUTTON_WIDTH: number;

  // Subcomponents
  private Buttons: Phaser.GameObjects.BitmapText[];
  private Btn_Handoff: Phaser.GameObjects.BitmapText;

  constructor(plane: Plane) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.Plane = plane;

    // Init: Buttons[]
    this.Buttons = [];

    // Setup: THIS
    this.setDepth(999);

    // Create: Buttons

    this.Btn_Handoff = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneHandoffMenuButtons.HANDOFF
    );
    this.Buttons.push(this.Btn_Handoff);

    this.add(this.Buttons);

    this.FONT_SIZE = 16;
    this.FONT_TINT_COLOR = ColorKeys.WHITE;
    this.FONT_TINT_COLOR_HOVER = ColorKeys.PTL_GREEN;
    const BTN_ORIGIN = [0, 0];

    // Setup: Buttons
    this.Buttons.forEach((button, idx) => {
      const buttonNum = idx + 1;
      // Setup: Button properties
      button.setOrigin(...BTN_ORIGIN);
      button.setFontSize(this.FONT_SIZE);
      button.setTint(this.FONT_TINT_COLOR);
      button.setPosition(0, this.FONT_SIZE * buttonNum);
      button.setInteractive({ cursor: 'pointer' });
      button.setName(button.text);

      // Input: Setup input listeners for all buttons
      button.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {});
    });
  }

  preUpdate() {}
}
