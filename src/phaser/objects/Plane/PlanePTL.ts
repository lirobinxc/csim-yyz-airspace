import { ColorKeys } from '../../types/ColorKeys';
import Plane from './Plane';
import PlaneSymbol from './PlaneSymbol';

export default class PlanePTL extends Phaser.GameObjects.Line {
  public TIME_IN_SEC: number; // seconds

  // Parent component + Reference components
  private Plane: Plane;
  private Symbol: PlaneSymbol;

  constructor(plane: Plane, symbol: PlaneSymbol, timeInSeconds: number) {
    super(plane.scene);

    // Common setup
    plane.scene.add.existing(this);
    this.Plane = plane;
    this.Symbol = symbol;
    this.TIME_IN_SEC = timeInSeconds;

    // Setup: THIS
    const LINE_ORIGIN = [0, 0];
    const LINE_WIDTH = 0.8;
    const LINE_COLOR = ColorKeys.PTL_GREEN;

    this.setOrigin(...LINE_ORIGIN);
    this.setStrokeStyle(LINE_WIDTH, LINE_COLOR);
    this.setLineWidth(LINE_WIDTH);

    // Sync update with FPS (set in Phaser Config)
    this.updatePtlPosition();
    this.scene.physics.world.on('worldstep', () => {
      this.updatePtlPosition();
    });
  }

  preUpdate() {}

  private updatePtlPosition() {
    const velocity = this.Plane.body.velocity;
    const symbolCenter = this.Symbol.getCenter();

    const point1 = {
      x: symbolCenter.x,
      y: symbolCenter.y,
    };

    const point2 = {
      x: symbolCenter.x + this.TIME_IN_SEC * velocity.x,
      y: symbolCenter.y + this.TIME_IN_SEC * velocity.y,
    };

    this.setTo(point1.x, point1.y, point2.x, point2.y);
  }
}
