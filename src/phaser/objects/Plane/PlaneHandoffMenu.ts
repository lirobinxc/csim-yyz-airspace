import RadarScene from '../../scenes/RadarScene';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import Plane from './Plane';

export enum PlaneHandoffMenuButtons {
  HANDOFF = 'H/O',
  SHOW_PTL = 'Show PTL',
  HIDE_PLANE = 'Hide Plane',
}

export default class PlaneHandoffMenu extends Phaser.GameObjects.Container {
  // Parent component
  private Scene: RadarScene;
  private Plane: Plane;

  public IS_VISIBLE: boolean;
  // Constants
  public FONT_SIZE: number;
  public FONT_TINT_COLOR: number;
  public FONT_TINT_COLOR_HOVER: number;
  // public BUTTON_WIDTH: number;

  // Subcomponents
  private Buttons: Phaser.GameObjects.BitmapText[];
  private Btn_Handoff: Phaser.GameObjects.BitmapText;
  private Btn_ShowPtl: Phaser.GameObjects.BitmapText;
  private Btn_HidePlane: Phaser.GameObjects.BitmapText;

  constructor(plane: Plane) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.Scene = plane.Scene;
    this.Plane = plane;
    this.IS_VISIBLE = false;

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
      `${PlaneHandoffMenuButtons.HANDOFF} > ${this.Plane.Properties.handoffData.sector}`
    );
    this.Btn_ShowPtl = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneHandoffMenuButtons.SHOW_PTL
    );
    this.Btn_HidePlane = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneHandoffMenuButtons.HIDE_PLANE
    );
    this.Buttons.push(this.Btn_Handoff, this.Btn_ShowPtl, this.Btn_HidePlane);

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

      button.on(DomEvents.POINTER_OVER, (pointer: Phaser.Input.Pointer) => {
        button.setTint(this.FONT_TINT_COLOR_HOVER);
      });
      button.on(DomEvents.POINTER_OUT, (pointer: Phaser.Input.Pointer) => {
        button.setTint(this.FONT_TINT_COLOR);
      });
    });

    // Emit:
    this.Btn_Handoff.on(
      DomEvents.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        this.scene.events.emit(
          PhaserCustomEvents.HANDOFF_BUTTON_CLICKED,
          this.Plane
        );

        this.IS_VISIBLE = false;
        this.Plane.HANDOFF_IN_PROGRESS = true;
      }
    );

    this.Btn_ShowPtl.on(
      DomEvents.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        this.scene.events.emit(
          PhaserCustomEvents.PTL_BUTTON_CLICKED,
          this.Plane
        );
        this.Plane.SHOW_PTL = !this.Plane.SHOW_PTL;
        this.IS_VISIBLE = false;
      }
    );

    this.Btn_HidePlane.on(
      DomEvents.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        this.scene.events.emit(
          PhaserCustomEvents.HIDE_PLANE_BUTTON_CLICKED,
          this.Plane
        );
        this.Plane.HistoryTrail.DotList.forEach((dot) => dot.setVisible(false));
        this.Plane.HistoryTrail.IS_VISIBLE = false;
        this.Plane.HistoryTrail.setVisible(false);
        this.Plane.setVisible(false);
      }
    );

    // On Event: Radar BG rightclicked
    this.scene.events.on(PhaserCustomEvents.RIGHT_CLICKED_RADAR_BG, () => {
      this.IS_VISIBLE = false;
    });

    // On Event: Radar BG rightclicked
    this.scene.events.on(
      PhaserCustomEvents.ACID_RIGHT_CLICKED,
      (plane: Plane) => {
        plane.HandoffMenu.IS_VISIBLE = true;

        if (this.Scene.SELECTED_PLANE instanceof Plane) {
          this.Scene.SELECTED_PLANE.IS_SELECTED = false;
          this.Scene.SELECTED_PLANE.setDepth(10);
        }
        this.Scene.SELECTED_PLANE = null;
      }
    );
  }

  preUpdate() {
    this.setVisible(this.IS_VISIBLE);
  }
}
