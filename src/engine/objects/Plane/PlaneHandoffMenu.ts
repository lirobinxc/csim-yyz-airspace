import RadarScene from '../../scenes/RadarScene';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import { TerminalPosition } from '../../types/SimTypes';
import Plane from './Plane';

export enum PlaneHandoffMenuButtons {
  HANDOFF = 'H/O',
  ACCEPT_HANDOFF = 'ACCEPT H/O',
  SHOW_PTL = 'Show PTL',
  HIDE_PLANE = 'Hide Plane',
  ON_BASE = 'Set ON BASE',
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
  private Btn_AcceptHandoff: Phaser.GameObjects.BitmapText;
  private Btn_ShowPtl: Phaser.GameObjects.BitmapText;
  private Btn_HidePlane: Phaser.GameObjects.BitmapText;
  private Btn_OnBase: Phaser.GameObjects.BitmapText;

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
    this.Btn_AcceptHandoff = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      `${PlaneHandoffMenuButtons.ACCEPT_HANDOFF}`
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
    this.Btn_OnBase = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      PlaneHandoffMenuButtons.ON_BASE
    );

    if (this.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL) {
      this.Buttons.push(this.Btn_AcceptHandoff, this.Btn_OnBase);
    }
    if (
      this.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE
    ) {
      this.Buttons.push(this.Btn_Handoff);
    }

    this.Buttons.push(this.Btn_ShowPtl, this.Btn_HidePlane);

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
        this.Plane.DEP_HANDOFF_IN_PROGRESS = true;
      }
    );

    this.Btn_AcceptHandoff.on(
      DomEvents.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        this.scene.events.emit(
          PhaserCustomEvents.ACCEPT_HANDOFF_BUTTON_CLICKED,
          this.Plane
        );

        this.IS_VISIBLE = false;
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
          PhaserCustomEvents.DESTROY_PLANE_BUTTON_CLICKED,
          this.Plane
        );
      }
    );

    this.Btn_OnBase.on(
      DomEvents.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        this.Plane.ARR_ON_BASE_TURN = true;
        this.scene.events.emit(
          PhaserCustomEvents.PLANE_ON_BASE_TURN,
          this.Plane
        );
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
    this.updateOnBaseText();
  }

  private updateOnBaseText() {
    if (this.Plane.ARR_ON_BASE_TURN) {
      if (this.Btn_OnBase) {
        this.Btn_OnBase.setTint(ColorKeys.IA_GREEN);
        this.Btn_OnBase.setText(`${PlaneHandoffMenuButtons.ON_BASE}: Yes`);
      }
    }
  }
}
