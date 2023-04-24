import Phaser from 'phaser';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import { TerminalPosition } from '../../types/SimTypes';
import { convertAcWtcToSymbol } from '../../utils/convertAcWtcToSymbol';
import { convertArrivalRunwayToSfi } from '../../utils/convertArrivalRunwayToSfi';
import Plane from './Plane';

export default class PlaneDataTag extends Phaser.GameObjects.Container {
  public isExtendedTag: boolean;
  public isDefaultPosition: boolean; // px
  public showVmi: boolean;

  // CONSTANTS
  public FLASHING_TEXT_INTERVAL!: ReturnType<typeof setInterval>;
  public LINE_SPACING: number; // px; space between the Text lines
  public GROUND_SPEED_OVERRIDE: number | undefined;

  // Parent component
  private Plane: Plane;

  // Subcomponents
  public Text1: Phaser.GameObjects.BitmapText;
  public Text2: Phaser.GameObjects.DynamicBitmapText;
  public Text3: Phaser.GameObjects.BitmapText;
  public TextIaTool: Phaser.GameObjects.BitmapText;

  constructor(plane: Plane) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.isExtendedTag = false;
    this.isDefaultPosition = true;
    this.showVmi = false;
    this.LINE_SPACING = 3; // px

    this.Plane = plane;

    // Attach: Text, max 9 chars per line
    this.Text1 = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      '123456789'
    );
    this.Text2 = new Phaser.GameObjects.DynamicBitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      '123456789'
    );
    this.Text3 = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      '123456789'
    );
    this.TextIaTool = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      ''
    );

    // Attach: All subcomponents to this container
    this.add([this.Text1, this.Text2, this.Text3, this.TextIaTool]);

    // Setup: Text1
    let FONT_SIZE = 13.5;
    const FONT_TINT_COLOR = ColorKeys.PPS_YELLOW; // light yellow
    const FONT_SCALE_Y = 0.9; // vertically squishes font
    const LINE_ORIGIN = [0, 0.5];

    this.Text1.setFontSize(FONT_SIZE);
    this.Text1.setTint(FONT_TINT_COLOR);
    this.Text1.scaleY = FONT_SCALE_Y;
    this.Text1.setOrigin(...LINE_ORIGIN);
    this.Text1.setInteractive();

    // Setup: Text2 - CENTER LINE
    this.Text2.setFontSize(FONT_SIZE);
    this.Text2.setTint(FONT_TINT_COLOR);
    this.Text2.scaleY = FONT_SCALE_Y;
    this.Text2.setDisplayCallback(this.incVmiFontSize);
    this.Text2.setOrigin(...LINE_ORIGIN);

    // Setup: Text3
    this.Text3.setFontSize(FONT_SIZE);
    this.Text3.setTint(FONT_TINT_COLOR);
    this.Text3.scaleY = FONT_SCALE_Y;
    this.Text3.setOrigin(...LINE_ORIGIN);

    // Setup: TextIaTool
    this.TextIaTool.setFontSize(FONT_SIZE);
    this.TextIaTool.setTint(ColorKeys.IA_GREEN);
    this.TextIaTool.scaleY = FONT_SCALE_Y;
    this.TextIaTool.setOrigin(...LINE_ORIGIN);

    // Setup: Text1 & Text3 positions relative to Line2 (CENTER LINE)
    this.setText1Text3TextIaToolPosition();

    // Input: On press F10 key, toggle EXT TAG
    this.scene.input.keyboard.on('keydown-F10', () => {
      this.Plane.Scene.SHOW_EXTENDED_TAGS =
        !this.Plane.Scene.SHOW_EXTENDED_TAGS;
    });

    // Input: On click Text 1
    this.Text1.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) {
        this.scene.events.emit(
          PhaserCustomEvents.ACID_RIGHT_CLICKED,
          this.Plane
        );
        return;
      }
      if (pointer.middleButtonDown()) {
        this.scene.events.emit(
          PhaserCustomEvents.DESTROY_PLANE_BUTTON_CLICKED,
          this.Plane
        );
        return;
      }

      this.scene.events.emit(PhaserCustomEvents.ACID_CLICKED, {
        plane: this.Plane,
        pointer,
      });
    });

    // Flash arrivals & departure satellite traffic:
    if (
      this.Plane.Scene.SIM_OPTIONS.terminalPosition ===
        TerminalPosition.ARRIVAL ||
      this.Plane.Properties.isSatellite
    ) {
      this.flashDataTag();
    }

    // On DEP Handoff Event: Flash text
    const DELAY_BEFORE_HANDOFF_ACCEPTED = 10_000; // ms
    const ACCEPTED_HANDOFF_FLASH_DURATION = 18_000; // ms
    this.scene.events.on(
      PhaserCustomEvents.HANDOFF_BUTTON_CLICKED,
      (plane: Plane) => {
        setTimeout(() => {
          plane.DataTag.flashDataTag();

          plane.DEP_HANDOFF_IN_PROGRESS = false;
          plane.IS_HANDED_OFF = true;
        }, DELAY_BEFORE_HANDOFF_ACCEPTED);

        setTimeout(() => {
          console.log(plane.Properties.acId.code, 'clearing interval');

          clearInterval(plane.DataTag.FLASHING_TEXT_INTERVAL);
          plane.DataTag.Text1.setTint(ColorKeys.PPS_YELLOW);
          plane.DataTag.Text2.setTint(ColorKeys.PPS_YELLOW);
        }, DELAY_BEFORE_HANDOFF_ACCEPTED + ACCEPTED_HANDOFF_FLASH_DURATION);
      }
    );

    this.scene.events.on(
      PhaserCustomEvents.ACCEPT_HANDOFF_BUTTON_CLICKED,
      (plane: Plane) => {
        clearInterval(plane.DataTag.FLASHING_TEXT_INTERVAL);
        plane.DataTag.Text1.setTint(ColorKeys.PPS_YELLOW);
        plane.DataTag.Text2.setTint(ColorKeys.PPS_YELLOW);

        plane.IS_HANDED_OFF = true;
        plane.ARR_HANDOFF_IN_PROGRESS = false;

        if (
          this.Plane.Scene.SIM_OPTIONS.terminalPosition ===
          TerminalPosition.ARRIVAL
        ) {
          this.scene.events.emit(PhaserCustomEvents.ARR_ACCEPTED, plane);
        }
      }
    );

    this.scene.events.on(
      PhaserCustomEvents.ACCEPT_SATELLITE_HANDOFF,
      (plane: Plane) => {
        console.log('clearing interval');

        clearInterval(plane.DataTag.FLASHING_TEXT_INTERVAL);

        plane.DataTag.Text1.setTint(ColorKeys.PPS_YELLOW);
        plane.DataTag.Text2.setTint(ColorKeys.PPS_YELLOW);

        plane.DEP_SAT_TRAFFIC_ACCEPTED = true;
      }
    );

    // Sync update with FPS (set in Phaser Config)
    this.updateText2();

    this.scene.physics.world.on('worldstep', () => {
      if (this.Plane.DESTROYED) return;

      this.updateText2();
      this.updateTextIaTool();
    });
  }

  preUpdate() {
    this.updateText1();
    this.updateText3();
  }

  private flashDataTag() {
    this.FLASHING_TEXT_INTERVAL = setInterval(() => {
      if (this.Plane.DataTag.Text1.tintTopLeft === ColorKeys.PPS_YELLOW) {
        this.Plane.DataTag.Text1.setTint(ColorKeys.WHITE);
        this.Plane.DataTag.Text2.setTint(ColorKeys.WHITE);
      } else {
        this.Plane.DataTag.Text1.setTint(ColorKeys.PPS_YELLOW);
        this.Plane.DataTag.Text2.setTint(ColorKeys.PPS_YELLOW);
      }
    }, 450);
  }

  // Local = relative to its own container
  public getText1LeftCenterLocal() {
    const text1LocalCoord = new Phaser.Math.Vector2(this.Text1.x, this.Text1.y);

    const coordPlusContainerPosition = new Phaser.Math.Vector2(
      text1LocalCoord.x + this.x,
      text1LocalCoord.y + this.y
    );

    return coordPlusContainerPosition;
  }

  // Local = relative to its own container
  public getText1RightCenterLocal() {
    const text2Width = this.Text2.getTextBounds().global.width;
    const text1LocalCoord = new Phaser.Math.Vector2(this.Text1.x, this.Text1.y);

    const coordPlusContainerPosition = new Phaser.Math.Vector2(
      text1LocalCoord.x + this.x + text2Width,
      text1LocalCoord.y + this.y
    );

    return coordPlusContainerPosition;
  }

  private updateText1() {
    if (this.Plane.Commands.altitude.current < 300) {
      this.Text1.setText('?');
      return;
    }

    const acid = this.Plane.Properties.acId.code;
    const wtcSymbol = convertAcWtcToSymbol(this.Plane.Properties.acWtc);

    const currHeading = ` HDG ${this.Plane.Commands.heading.current
      .toFixed(1)
      .toString()
      .padStart(5, '0')}`;

    let arrRunwaySfi = '';
    if (
      this.Plane.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL
    ) {
      arrRunwaySfi = convertArrivalRunwayToSfi(
        this.Plane.Properties.arrivalData.arrRunway
      );
    }

    this.Text1.setText(
      `${acid}${wtcSymbol} ${arrRunwaySfi}${
        this.Plane.Scene.IS_DEBUG_MODE ? currHeading : ''
      }`
    );
  }

  private updateText2() {
    if (this.Plane.Commands.altitude.current < 300) {
      this.Text2.setText('');
      return;
    }

    const currCommands = this.Plane.Commands;

    const altitude = Math.floor(currCommands.altitude.current / 100)
      .toString()
      .padStart(3, '0');

    const vmi = this.showVmi ? (currCommands.isDescending ? '↓' : '↑') : ' ';

    const vmr = this.showVmi
      ? Math.floor(currCommands.climbRate.current / 100)
          .toString()
          .padStart(2, '0')
      : '  ';

    let groundSpeed = currCommands.speed.current;

    if (this.GROUND_SPEED_OVERRIDE) {
      groundSpeed = this.GROUND_SPEED_OVERRIDE;
    }

    const groundSpeedText = Math.ceil(groundSpeed / 10)
      .toString()
      .padStart(2, '0');

    let handoffText = '';
    if (this.Plane.DEP_HANDOFF_IN_PROGRESS) {
      handoffText = ` >${this.Plane.Properties.handoffData.sector}`;
    }

    this.Text2.setText(
      `${altitude}${vmi}${vmr} ${groundSpeedText}${handoffText}`
    ); // max 9 chars length
  }

  private updateText3() {
    if (this.Plane.Scene.SHOW_EXTENDED_TAGS) {
      const acModel = this.Plane.Properties.acModel.padEnd(4, ' ');
      const destination = this.Plane.Properties.filedData.destination;
      this.Text3.setText(`${acModel} ${destination}`); // max 9 chars length
    } else {
      this.Text3.setText('');
    }
  }

  private updateTextIaTool() {
    if (this.Plane.IaIndicator.MAX_CONSTRAINT_TYPE) {
      this.TextIaTool.setText(
        `${this.Plane.IaIndicator.SPACING.toFixed(1)}${
          this.Plane.IaIndicator.DELTA
        }`
      ); // max 9 chars length
    } else {
      this.TextIaTool.setText('');
    }
  }

  private setText1Text3TextIaToolPosition() {
    const line2Height = this.Text2.getTextBounds().global.height;

    this.TextIaTool.setY(-line2Height * 2 + this.LINE_SPACING);
    this.Text1.setY(-line2Height + this.LINE_SPACING);
    this.Text3.setY(line2Height - this.LINE_SPACING);
  }

  private incVmiFontSize(
    data: Phaser.Types.GameObjects.BitmapText.DisplayCallbackConfig
  ) {
    if (data.index === 3) {
      data.scale = 0.85;
      data.x = data.x - 14.5;
      data.y = data.y - 5;
      // console.log(data.scale);
      return data;
    }

    return data;
  }
}
