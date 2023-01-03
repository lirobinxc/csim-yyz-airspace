import Phaser from 'phaser';
import { AssetKeys } from '../../types/AssetKeys';
import { ColorKeys } from '../../types/ColorKeys';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import { DomEvents } from '../../types/DomEvents';
import { convertAcWtcToSymbol } from '../../utils/convertAcWtcToSymbol';
import Plane from './Plane';
import PlaneSymbol from './PlaneSymbol';

export default class PlaneDataTag extends Phaser.GameObjects.Container {
  public isExtendedTag: boolean;
  public isDefaultPosition: boolean; // px
  public showVmi: boolean;

  // CONSTANTS
  public LINE_SPACING: 3; // px; space between the Text lines

  // Parent component
  private Plane: Plane;

  // Subcomponents
  private Text1: Phaser.GameObjects.BitmapText;
  private Text2: Phaser.GameObjects.DynamicBitmapText;
  private Text3: Phaser.GameObjects.BitmapText;

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

    // Attach: All subcomponents to this container
    this.add([this.Text1, this.Text2, this.Text3]);

    // Setup: Text1
    const FONT_SIZE = 16;
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

    // Setup: Text1 & Text3 positions relative to Line2 (CENTER LINE)
    this.setText1Text3Position();

    // Input: On press F10 key, toggle EXT TAG
    this.scene.input.keyboard.on('keydown-F10', () => {
      this.isExtendedTag = !this.isExtendedTag;
    });

    // Input: On click Text 1
    this.Text1.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      this.scene.events.emit(PhaserCustomEvents.ACID_CLICKED, {
        plane: this.Plane,
        pointer,
      });
    });

    // Sync update with FPS (set in Phaser Config)
    this.updateText2();

    this.scene.physics.world.on('worldstep', () => {
      this.updateText2();
    });
  }

  preUpdate() {
    this.updateText1();
    this.updateText3();
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
    const acid = this.Plane.Properties.acId.code;
    const wtcSymbol = convertAcWtcToSymbol(this.Plane.Properties.acWtc);

    const currHeading = ` HDG ${this.Plane.Commands.heading.current
      .toFixed(1)
      .toString()
      .padStart(5, '0')}`;

    this.Text1.setText(
      `${acid}${wtcSymbol}${this.Plane.Options.isDebug ? currHeading : ''}`
    );
  }

  private updateText2() {
    const currCommands = this.Plane.Commands;

    const altitude = Math.floor(currCommands.altitude.current / 100)
      .toString()
      .padStart(3, '0');

    const vmi = this.showVmi ? '↑' : currCommands.isDescending ? '↓' : ' ';

    const vmr = this.showVmi
      ? Math.floor(currCommands.climbRate.current / 100)
          .toString()
          .padStart(2, '0')
      : '  ';

    const groundSpeed = Math.ceil(currCommands.speed.current / 10)
      .toString()
      .padStart(2, '0');

    this.Text2.setText(`${altitude}${vmi}${vmr} ${groundSpeed}`); // max 9 chars length
  }

  private updateText3() {
    if (this.isExtendedTag) {
      const acModel = this.Plane.Properties.acModel.padEnd(4, ' ');
      const destination = this.Plane.Properties.filedData.destination;
      this.Text3.setText(`${acModel} ${destination}`); // max 9 chars length
    } else {
      this.Text3.setText('');
    }
  }

  private setText1Text3Position() {
    const line2Height = this.Text2.getTextBounds().global.height;

    this.Text1.setY(-line2Height + this.LINE_SPACING);
    this.Text3.setY(line2Height - this.LINE_SPACING);
  }

  private incVmiFontSize(
    data: Phaser.Types.GameObjects.BitmapText.DisplayCallbackConfig
  ) {
    if (data.index === 3) {
      data.scale = 0.85;
      data.x = data.x - 9.5;
      data.y = data.y - 4;
      // console.log(data.scale);
      return data;
    }

    return data;
  }
}
