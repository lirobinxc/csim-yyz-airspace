import RadarScene from '../scenes/RadarScene';
import { AssetKeys } from '../types/AssetKeys';
import { ColorKeys } from '../types/ColorKeys';
import { DomEvents } from '../types/DomEvents';
import Plane from './Plane/Plane';

export default class RBL extends Phaser.GameObjects.Layer {
  private Line: Phaser.GameObjects.Line;
  private Label: Phaser.GameObjects.BitmapText;

  private Plane1: Plane;
  private Plane2: Plane;

  constructor(scene: RadarScene, plane1: Plane, plane2: Plane) {
    super(scene);

    this.Line = new Phaser.GameObjects.Line(scene, 0, 0);
    this.Label = new Phaser.GameObjects.BitmapText(
      scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      ''
    );
    this.Plane1 = plane1;
    this.Plane2 = plane2;

    this.add(this.Line);
    this.add(this.Label);
    this.scene.add.existing(this);

    // Setup: Line
    const LINE_WIDTH = 0.5;

    this.Line.setOrigin(0, 0);
    this.Line.setStrokeStyle(LINE_WIDTH, ColorKeys.LIGHT_BLUE);
    this.Line.setLineWidth(LINE_WIDTH);
    this.Line.setDepth(111);

    // Setup: Text
    this.Label.setFontSize(14);
    this.Label.setTint(ColorKeys.LIGHT_BLUE);

    this.Label.on(DomEvents.POINTER_DOWN, () => {
      this.destroy();
    });
  }

  preUpdate() {
    this.updateCoordinates();
    this.updateLabel();
  }

  private updateCoordinates() {
    if (this.Line) {
      this.Line.setTo(
        this.Plane1.x,
        this.Plane1.y,
        this.Plane2.x,
        this.Plane2.y
      );
    }
  }

  private updateLabel() {
    const PIXELS_PER_MILE = 18.83333;

    const rblLineGeom = this.Line.geom as Phaser.Geom.Line;
    const lengthInPixels = Phaser.Geom.Line.Length(rblLineGeom);
    const lengthInMiles = lengthInPixels / PIXELS_PER_MILE;

    this.Label.setText(`${lengthInMiles.toPrecision(3)}`);

    const centerOfLine = Phaser.Geom.Line.GetMidPoint(rblLineGeom);

    this.Label.setPosition(centerOfLine.x, centerOfLine.y);

    // Change hitbox to match Label text
    this.Label.setInteractive({ cursor: 'pointer' });
  }
}
