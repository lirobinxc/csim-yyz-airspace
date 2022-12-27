import Phaser from 'phaser';
import { AssetKeys } from '../../types/AssetKeys';
import { convertAcWtcToSymbol } from '../../utils/convertAcWtcToSymbol';
import Plane from './Plane';
import PlaneSymbol from './PlaneSymbol';

export default class PlaneDataTag extends Phaser.GameObjects.Container {
  public isExtendedTag: boolean;
  public isDefaultPosition: boolean; // px

  private Plane: Plane;
  private Symbol: PlaneSymbol;
  private TextLine1: Phaser.GameObjects.BitmapText;
  private TextLine2: Phaser.GameObjects.DynamicBitmapText;
  private TextLine3: Phaser.GameObjects.BitmapText;

  constructor(plane: Plane, planeSymbol: PlaneSymbol) {
    super(plane.scene);

    // Common setup tasks
    plane.scene.add.existing(this);
    this.isExtendedTag = false;
    this.isDefaultPosition = true; // px
    this.Plane = plane;
    this.Symbol = planeSymbol;

    // Attach: Text
    this.TextLine1 = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD
    );
    this.TextLine2 = new Phaser.GameObjects.DynamicBitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD
    );
    this.TextLine3 = new Phaser.GameObjects.BitmapText(
      plane.scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD
    );
    this.add([this.TextLine1, this.TextLine2, this.TextLine3]);

    // Setup: Line1
    const FONT_SIZE = 16;
    const FONT_TINT_COLOR = 0xeae37f; // light yellow
    const FONT_SCALE_Y = 0.9; // vertically squishes font
    const LINE_ORIGIN = [0, 0.5];

    this.TextLine1.setFontSize(FONT_SIZE);
    this.TextLine1.setTint(FONT_TINT_COLOR);
    this.TextLine1.scaleY = FONT_SCALE_Y;
    this.TextLine1.setOrigin(...LINE_ORIGIN);

    // Setup: Line2 - CENTER LINE
    this.TextLine2.setFontSize(FONT_SIZE);
    this.TextLine2.setTint(FONT_TINT_COLOR);
    this.TextLine2.scaleY = FONT_SCALE_Y;
    this.TextLine2.setDisplayCallback(this.incVmiFontSize);
    this.TextLine2.setOrigin(...LINE_ORIGIN);

    // Setup: Line3
    this.TextLine3.setFontSize(FONT_SIZE);
    this.TextLine3.setTint(FONT_TINT_COLOR);
    this.TextLine3.scaleY = FONT_SCALE_Y;
    this.TextLine3.setOrigin(...LINE_ORIGIN);

    // Setup: Line1 & Line3 positions relative to Line2 (CENTER LINE)
    this.setLine1Line3Position();

    // Input: On press F10 key, toggle EXT TAG
    this.scene.input.keyboard.on('keydown-F10', () => {
      this.isExtendedTag = !this.isExtendedTag;
    });
  }

  preUpdate() {
    this.setLine1Line3Position();
    this.updateLine1Text();
    this.updateLine2Text();
    this.updateLine3Text();
  }

  private updateLine1Text() {
    const acid = this.Plane.Properties.acId.abbrev;
    const wtcSymbol = convertAcWtcToSymbol(this.Plane.Properties.acWtc);
    this.TextLine1.setText(`${acid}${wtcSymbol}`);
  }

  private updateLine2Text() {
    const currCommands = this.Plane.Commands;

    const altitude = currCommands.altitude.current.toString().padStart(3, '0');

    const vmi = currCommands.isClimbing
      ? '↑'
      : currCommands.isDescending
      ? '↓'
      : ' ';

    const vmr = currCommands.isClimbing
      ? currCommands.climbRate.current.toString().padStart(2, '0')
      : '  ';

    const groundSpeed = Math.round(currCommands.speed.current / 10);

    this.TextLine2.setText(`${altitude}${vmi}${vmr} ${groundSpeed}`); // max 9 chars length
  }

  updateLine3Text() {
    if (this.isExtendedTag) {
      const acModel = this.Plane.Properties.acModel.padEnd(4, ' ');
      const destination = this.Plane.Properties.filedData.destination;
      this.TextLine3.setText(`${acModel} ${destination}`); // max 9 chars length
    } else {
      this.TextLine3.setText('');
    }
  }

  private setLine1Line3Position() {
    const line2Height = this.TextLine2.getTextBounds().global.height;

    const LINE_SPACING = 3;
    this.TextLine1.setY(-line2Height + LINE_SPACING);
    this.TextLine3.setY(line2Height - LINE_SPACING);
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
