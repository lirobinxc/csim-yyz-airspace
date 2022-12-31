import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import PlaneCommandMenu from './PlaneCommandMenu';

export interface PlaneCommandSubmenuValue {
  text: string;
  value: number;
  isSpecial?: boolean;
}

export default class PlaneCommandSubmenu extends Phaser.GameObjects.Container {
  private Buttons: Phaser.GameObjects.BitmapText[];

  public IS_VISIBLE: boolean;

  constructor(
    commandMenu: PlaneCommandMenu,
    x: number,
    y: number,
    items: PlaneCommandSubmenuValue[],
    columns: number,
    eventToEmitOnClick: PhaserCustomEvents
  ) {
    super(commandMenu.scene, x, y);

    // Common setup
    this.scene.add.existing(this);
    commandMenu.add(this);
    this.Buttons = [];
    this.IS_VISIBLE = false;

    const PARENT_FONT_SIZE = commandMenu.FONT_SIZE;
    const FONT_TINT_COLOR = commandMenu.FONT_TINT_COLOR;
    const FONT_TINT_COLOR_HOVER = commandMenu.FONT_TINT_COLOR_HOVER;
    const COLUMNS = columns;
    const BUTTON_SPACING_X = 3;

    // Create: Buttons
    let CURRENT_COLUMN = 0;
    items.forEach((item, idx) => {
      if (CURRENT_COLUMN === COLUMNS) {
        CURRENT_COLUMN = 0;
      }

      const currentRow = Math.floor(idx / COLUMNS); // starts at Row 0

      // Create: Button
      const button = new Phaser.GameObjects.BitmapText(
        this.scene,
        0,
        0,
        AssetKeys.FONT_DEJAVU_MONO_BOLD,
        item.text,
        PARENT_FONT_SIZE
      );

      // Setup: Button
      button.setX(
        button.width * CURRENT_COLUMN + BUTTON_SPACING_X * CURRENT_COLUMN
      );
      button.setY(
        PARENT_FONT_SIZE * currentRow + BUTTON_SPACING_X * currentRow
      );
      button.setInteractive({ cursor: 'pointer' });

      // Setup: Highlight special buttons
      if (item.isSpecial) {
        const specialBg = new Phaser.GameObjects.Rectangle(
          this.scene,
          button.x,
          button.y,
          button.width,
          button.height
        );
        specialBg.setOrigin(0, 0);
        specialBg.setStrokeStyle(2, ColorKeys.PTL_GREEN);
        this.add(specialBg);
      }

      // Input: Setup input listeners for button
      button.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
        button.setTint(FONT_TINT_COLOR);
        this.scene.events.emit(eventToEmitOnClick, item);
        this.IS_VISIBLE = false;
      });
      button.on(DomEvents.POINTER_OVER, (pointer: Phaser.Input.Pointer) => {
        button.setTint(FONT_TINT_COLOR_HOVER);
      });
      button.on(DomEvents.POINTER_OUT, (pointer: Phaser.Input.Pointer) => {
        button.setTint(FONT_TINT_COLOR);
      });

      this.Buttons.push(button);

      CURRENT_COLUMN++;
    });

    this.add(this.Buttons);
  }

  preUpdate() {
    this.setVisible(this.IS_VISIBLE);
  }
}
