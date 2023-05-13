import { ColorKeys } from '../../types/ColorKeys';
import Plane from './Plane';
import PlaneDataTag from './PlaneDataTag';
import PlaneSymbol from './PlaneSymbol';

export default class PlaneDataTagLine extends Phaser.GameObjects.Container {
  public Line0: Phaser.GameObjects.Line;
  public Line1: Phaser.GameObjects.Line;

  // Parent component + Reference components
  private Plane: Plane;
  private Symbol: PlaneSymbol;
  private DataTag: PlaneDataTag;

  constructor(plane: Plane, symbol: PlaneSymbol, dataTag: PlaneDataTag) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.Plane = plane;
    this.Symbol = symbol;
    this.DataTag = dataTag;

    // Attach: Line0, short horizontal line extending outwards from DataTag.Text1
    this.Line0 = new Phaser.GameObjects.Line(plane.scene);
    this.Line1 = new Phaser.GameObjects.Line(plane.scene);
    this.add([this.Line0, this.Line1]);

    // Setup: Line0
    const LINE_ORIGIN = [0, 0];
    const LINE_WIDTH = 0.8;
    const LINE_COLOR = ColorKeys.PPS_YELLOW;

    this.Line0.setOrigin(...LINE_ORIGIN);
    this.Line0.setStrokeStyle(LINE_WIDTH, LINE_COLOR);
    this.Line0.setLineWidth(LINE_WIDTH);

    // Setup: Line1
    this.Line1.setOrigin(...LINE_ORIGIN);
    this.Line1.setStrokeStyle(LINE_WIDTH, LINE_COLOR);
    this.Line1.setLineWidth(LINE_WIDTH);

    // Setup: Default line style
    this.updateDefaultLinePosition();
  }

  preUpdate() {
    this.updateDefaultLinePosition();
  }

  private updateDefaultLinePosition() {
    const symbolCenter = this.Symbol.getCenter();
    const text1Position = this.DataTag.getText1LeftCenterLocal();

    const line0Point1 = new Phaser.Math.Vector2(
      text1Position.x - this.Plane.DEFAULT_DATATAG_SPACING,
      text1Position.y
    );
    const line0Point2 = new Phaser.Math.Vector2(
      text1Position.x,
      text1Position.y
    );

    this.Line0.setTo(
      line0Point1.x,
      line0Point1.y,
      line0Point2.x,
      line0Point2.y
    );

    this.Line1.setTo(
      symbolCenter.x,
      symbolCenter.y,
      line0Point1.x,
      line0Point1.y
    );
  }
}
