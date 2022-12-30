import RadarScene from '../../scenes/RadarScene';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import { WaypointDataAll } from '../../types/WaypointTypes';
import Waypoint from '../Waypoint';
import Plane from './Plane';

export enum PlaneCommandMenuButtons {
  DIRECT_TO = 'DIRECT TO',
  HEADING = 'HEADING',
  ALTITUDE = 'ALTITUDE',
  SPEED = 'SPEED',
}

export default class PlaneCommandMenu extends Phaser.GameObjects.Container {
  public SELECTED_BUTTON: Phaser.GameObjects.BitmapText | null;

  // Parent component
  private Plane: Plane;

  // Subcomponents
  private Buttons: Phaser.GameObjects.BitmapText[];
  private Btn_DirectTo: Phaser.GameObjects.BitmapText;
  private Btn_Heading: Phaser.GameObjects.BitmapText;
  private Btn_Altitude: Phaser.GameObjects.BitmapText;
  private Btn_Speed: Phaser.GameObjects.BitmapText;

  constructor(plane: Plane) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.Plane = plane;
    this.SELECTED_BUTTON = null;

    // Init Buttons[]
    this.Buttons = [];

    // Setup: THIS
    this.setDepth(999);

    // Create: Buttons

    this.Btn_DirectTo = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneCommandMenuButtons.DIRECT_TO
    );
    this.Btn_Altitude = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneCommandMenuButtons.ALTITUDE
    );
    this.Btn_Heading = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneCommandMenuButtons.HEADING
    );
    this.Btn_Speed = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneCommandMenuButtons.SPEED
    );
    this.Buttons.push(
      this.Btn_DirectTo,
      this.Btn_Heading,
      this.Btn_Altitude,
      this.Btn_Speed
    );

    this.add(this.Buttons);

    const FONT_SIZE = 16;
    const FONT_TINT_COLOR = ColorKeys.WHITE;
    const FONT_TINT_COLOR_HOVER = ColorKeys.PTL_GREEN;
    const BTN_ORIGIN = [0, 0];

    this.Buttons.forEach((button, idx) => {
      const buttonNum = idx + 1;
      // Setup: Button properties
      button.setOrigin(...BTN_ORIGIN);
      button.setFontSize(FONT_SIZE);
      button.setTint(FONT_TINT_COLOR);
      button.setPosition(0, FONT_SIZE * buttonNum);
      button.setInteractive({ cursor: 'pointer' });
      button.setName(button.text);

      // Input: Setup input listeners for all buttons
      button.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
        button.setTint(FONT_TINT_COLOR_HOVER);
        this.SELECTED_BUTTON?.setTint(FONT_TINT_COLOR);
        this.SELECTED_BUTTON = button;
      });
      button.on(DomEvents.POINTER_OVER, (pointer: Phaser.Input.Pointer) => {
        button.setTint(FONT_TINT_COLOR_HOVER);
      });
      button.on(DomEvents.POINTER_OUT, (pointer: Phaser.Input.Pointer) => {
        if (this.SELECTED_BUTTON?.name !== button.name) {
          button.setTint(FONT_TINT_COLOR);
        }
      });
    });

    this.Plane.Scene.events.on(
      PhaserCustomEvents.WP_CLICKED,
      (waypoint: WaypointDataAll) => {
        this.setDirectTo(waypoint);
      }
    );

    // On sync
    // this.scene.physics.world.on('worldstep', () => {
    //   console.log(this.SELECTED_BUTTON?.name);
    // });
  }

  preUpdate() {
    this.ifPlaneIsSelected();
  }

  private setDirectTo(waypoint: WaypointDataAll) {
    if (!waypoint) return;

    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.DIRECT_TO) {
      this.Plane.commandDirectTo(waypoint);
      this.resetSelectedButton();
    }
  }

  private ifPlaneIsSelected() {
    if (this.Plane.IS_SELECTED) {
      this.setVisible(true);
    } else {
      this.setVisible(false);
      this.resetSelectedButton();
    }
  }

  private resetSelectedButton() {
    this.SELECTED_BUTTON?.setTint(ColorKeys.WHITE);
    this.SELECTED_BUTTON = null;
  }
}
