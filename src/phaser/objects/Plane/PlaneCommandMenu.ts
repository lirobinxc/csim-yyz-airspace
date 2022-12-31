import RadarScene from '../../scenes/RadarScene';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import { WaypointDataAll } from '../../types/WaypointTypes';
import {
  DropDownList,
  Label,
} from 'phaser3-rex-plugins/templates/ui/ui-components.js';

import Waypoint from '../Waypoint';
import Plane from './Plane';
import PlaneCommandSubmenu, {
  PlaneCommandSubmenuValue,
} from './PlaneCommandSubmenu';

export enum PlaneCommandMenuButtons {
  DIRECT_TO = 'DIRECT TO', // all items should be 9 chars long
  HEADING = 'HEADING  ',
  ALTITUDE = 'ALTITUDE ',
  SPEED = 'SPEED    ',
}

export default class PlaneCommandMenu extends Phaser.GameObjects.Container {
  public SELECTED_BUTTON: Phaser.GameObjects.BitmapText | null;

  // Constants
  public FONT_SIZE: number;
  public FONT_TINT_COLOR: number;
  public FONT_TINT_COLOR_HOVER: number;
  public BUTTON_WIDTH: number;

  // Timer to allow chaining commands
  private COMMAND_CUE_TIME_LIMIT: number; // ms
  private TIMER_START: number;
  public COMMAND_CUE: {
    directTo: WaypointDataAll | null;
    heading: number | null;
    altitude: number | null;
    speed: number | null; // knots
  };

  // Parent component
  private Plane: Plane;

  // Subcomponents
  private Buttons: Phaser.GameObjects.BitmapText[];
  private Btn_DirectTo: Phaser.GameObjects.BitmapText;
  private Btn_Heading: Phaser.GameObjects.BitmapText;
  private Btn_Heading_Submenu: PlaneCommandSubmenu;
  private Btn_Altitude: Phaser.GameObjects.BitmapText;
  private Btn_Altitude_Submenu: PlaneCommandSubmenu;
  private Btn_Speed: Phaser.GameObjects.BitmapText;
  private Btn_Speed_Submenu: PlaneCommandSubmenu;

  constructor(plane: Plane) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.Plane = plane;
    this.SELECTED_BUTTON = null;

    // Init: Command Cue & cue timer
    this.COMMAND_CUE_TIME_LIMIT = 3000;
    this.TIMER_START = 0;
    this.COMMAND_CUE = {
      directTo: null,
      heading: null,
      altitude: null,
      speed: null,
    };

    // Init: Buttons[]
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
      button.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
        this.SELECTED_BUTTON?.setTint(this.FONT_TINT_COLOR);
        this.SELECTED_BUTTON = button;
        this.SELECTED_BUTTON.setTint(this.FONT_TINT_COLOR_HOVER);
      });
      button.on(DomEvents.POINTER_OVER, (pointer: Phaser.Input.Pointer) => {
        button.setTint(this.FONT_TINT_COLOR_HOVER);
      });
      button.on(DomEvents.POINTER_OUT, (pointer: Phaser.Input.Pointer) => {
        if (this.SELECTED_BUTTON?.name !== button.name) {
          button.setTint(this.FONT_TINT_COLOR);
        }
      });
    });

    this.BUTTON_WIDTH = this.Btn_DirectTo.width;

    // Create: Altitude Submenu
    const altOptions: PlaneCommandSubmenuValue[] = [];
    for (let i = 3; i < 24; i++) {
      const altNum = i * 10;
      const altValue = i * 1000;
      const isSpecial = [50, 70, 80, 150, 230].includes(altNum);

      altOptions.push({
        text: altNum.toString().padStart(3, ' '),
        value: altValue,
        isSpecial,
      });
    }

    this.Btn_Altitude_Submenu = new PlaneCommandSubmenu(
      this,
      this.Btn_Altitude.x + this.Btn_Altitude.width,
      this.Btn_Altitude.y,
      altOptions,
      4,
      PhaserCustomEvents.ALTITUDE_SUBMENU_CLICKED
    );

    // Create: Heading Submenu
    const headingOptions: PlaneCommandSubmenuValue[] = [];
    for (let i = 1; i < 37; i++) {
      const headingNum = i * 10;
      const isSpecial = [60, 240, 150, 330].includes(headingNum);

      headingOptions.push({
        text: headingNum.toString().padStart(3, '0'),
        value: headingNum,
        isSpecial,
      });
    }

    this.Btn_Heading_Submenu = new PlaneCommandSubmenu(
      this,
      this.Btn_Heading.x + this.Btn_Heading.width,
      this.Btn_Heading.y,
      headingOptions,
      3,
      PhaserCustomEvents.HEADING_SUBMENU_CLICKED
    );

    // Create: Speed Submenu
    const speedOptions: PlaneCommandSubmenuValue[] = [];
    [140, 160, 230, 250, 260, 280].forEach((speed) => {
      // const isSpecial = [].includes(speed)

      speedOptions.push({
        text: speed.toString().padStart(3, ' '),
        value: speed,
        isSpecial: false,
      });
    });

    this.Btn_Speed_Submenu = new PlaneCommandSubmenu(
      this,
      this.Btn_Speed.x + this.Btn_Speed.width,
      this.Btn_Speed.y,
      speedOptions,
      3,
      PhaserCustomEvents.SPEED_SUBMENU_CLICKED
    );

    // On PhaserCustomEvent: Waypoint clicked
    this.Plane.Scene.events.on(
      PhaserCustomEvents.WP_CLICKED,
      (waypoint: WaypointDataAll) => {
        this.setDirectTo(waypoint);
      }
    );

    // On PhaserCustomEvent: Altitude submenu selection
    this.Plane.Scene.events.on(
      PhaserCustomEvents.ALTITUDE_SUBMENU_CLICKED,
      (altitude: PlaneCommandSubmenuValue) => {
        this.setAltitude(altitude);
      }
    );

    // On PhaserCustomEvent: Heading submenu selection
    this.Plane.Scene.events.on(
      PhaserCustomEvents.HEADING_SUBMENU_CLICKED,
      (heading: PlaneCommandSubmenuValue) => {
        this.setHeading(heading);
      }
    );

    // On PhaserCustomEvent: Speed submenu selection
    this.Plane.Scene.events.on(
      PhaserCustomEvents.SPEED_SUBMENU_CLICKED,
      (speed: PlaneCommandSubmenuValue) => {
        this.setSpeed(speed);
      }
    );

    // On sync
    // this.scene.physics.world.on('worldstep', () => {
    //   console.log(this.SELECTED_BUTTON?.name);
    // });
  }

  preUpdate() {
    this.sendCommandCue();

    this.ifPlaneIsSelected();
    this.ifDirectToCommandIsSelected();
    this.ifHeadingCommandIsSelected();
    this.ifAltitudeCommandIsSelected();
    this.ifSpeedCommandIsSelected();
  }

  private sendCommandCue() {
    if (this.SELECTED_BUTTON) return; // pause sending commands if a button is active

    const currentTime = this.scene.time.now;
    const timeDiff = currentTime - this.TIMER_START;

    if (timeDiff > this.COMMAND_CUE_TIME_LIMIT) {
      if (this.COMMAND_CUE.directTo) {
        this.Plane.commandDirectTo(this.COMMAND_CUE.directTo);
        this.COMMAND_CUE.directTo = null;
        this.Btn_DirectTo.setText(PlaneCommandMenuButtons.DIRECT_TO);
      }
      if (this.COMMAND_CUE.heading) {
        this.Plane.commandHeading(this.COMMAND_CUE.heading);
        this.COMMAND_CUE.heading = null;
        this.Btn_Heading.setText(PlaneCommandMenuButtons.HEADING);
      }
      if (this.COMMAND_CUE.altitude) {
        this.Plane.commandAltitude(this.COMMAND_CUE.altitude);
        this.COMMAND_CUE.altitude = null;
        this.Btn_Altitude.setText(PlaneCommandMenuButtons.ALTITUDE);
      }
      if (this.COMMAND_CUE.speed) {
        this.Plane.commandSpeed(this.COMMAND_CUE.speed);
        this.COMMAND_CUE.speed = null;
        this.Btn_Speed.setText(PlaneCommandMenuButtons.SPEED);
      }
    }
  }

  private setDirectTo(waypoint: WaypointDataAll) {
    if (!waypoint) return;

    this.TIMER_START = this.scene.time.now;

    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.DIRECT_TO) {
      this.Btn_DirectTo.setText(
        `${PlaneCommandMenuButtons.DIRECT_TO} >${waypoint.name}`
      );

      this.COMMAND_CUE.heading = null;
      this.COMMAND_CUE.directTo = waypoint;
      this.resetSelectedButton();
    }
  }

  private setHeading(heading: PlaneCommandSubmenuValue) {
    if (!heading) return;

    this.TIMER_START = this.scene.time.now;

    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.HEADING) {
      this.Btn_Heading.setText(
        `${PlaneCommandMenuButtons.HEADING} >${heading.text}`
      );

      this.COMMAND_CUE.directTo = null;
      this.COMMAND_CUE.heading = heading.value;
      this.resetSelectedButton();
    }
  }

  private setAltitude(altitude: PlaneCommandSubmenuValue) {
    if (!altitude) return;

    this.TIMER_START = this.scene.time.now;

    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.ALTITUDE) {
      this.Btn_Altitude.setText(
        `${PlaneCommandMenuButtons.ALTITUDE} >${altitude.text}`
      );
      this.COMMAND_CUE.altitude = altitude.value;
      this.resetSelectedButton();
    }
  }

  private setSpeed(speed: PlaneCommandSubmenuValue) {
    if (!speed) return;

    this.TIMER_START = this.scene.time.now;

    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.SPEED) {
      this.Btn_Speed.setText(`${PlaneCommandMenuButtons.SPEED} >${speed.text}`);
      this.COMMAND_CUE.speed = speed.value;
      this.resetSelectedButton();
    }
  }

  private ifDirectToCommandIsSelected() {
    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.DIRECT_TO) {
      this.COMMAND_CUE.directTo = null;
      this.Btn_DirectTo.setText(`${PlaneCommandMenuButtons.DIRECT_TO} >`);
      return;
    } else if (!this.COMMAND_CUE.directTo) {
      this.Btn_DirectTo.setText(PlaneCommandMenuButtons.DIRECT_TO);
    }
  }

  private ifAltitudeCommandIsSelected() {
    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.ALTITUDE) {
      this.COMMAND_CUE.altitude = null;
      this.Btn_Altitude.setText(PlaneCommandMenuButtons.ALTITUDE);

      this.Btn_Altitude_Submenu.IS_VISIBLE = true;
    } else {
      this.Btn_Altitude_Submenu.IS_VISIBLE = false;
    }
  }

  private ifHeadingCommandIsSelected() {
    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.HEADING) {
      this.COMMAND_CUE.heading = null;
      this.Btn_Heading.setText(PlaneCommandMenuButtons.HEADING);

      this.Btn_Heading_Submenu.IS_VISIBLE = true;
    } else {
      if (!this.COMMAND_CUE.heading) {
        this.Btn_Heading.setText(PlaneCommandMenuButtons.HEADING);
      }
      this.Btn_Heading_Submenu.IS_VISIBLE = false;
    }
  }

  private ifSpeedCommandIsSelected() {
    if (this.SELECTED_BUTTON?.name === PlaneCommandMenuButtons.SPEED) {
      this.COMMAND_CUE.speed = null;
      this.Btn_Speed.setText(PlaneCommandMenuButtons.SPEED);

      this.Btn_Speed_Submenu.IS_VISIBLE = true;
    } else {
      this.Btn_Speed_Submenu.IS_VISIBLE = false;
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
