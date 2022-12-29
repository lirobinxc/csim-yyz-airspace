import { ColorKeys } from '../../types/ColorKeys';
import Plane from './Plane';
import PlaneSymbol from './PlaneSymbol';

export default class PlaneHistoryTrail extends Phaser.GameObjects.Container {
  private DotList: Phaser.GameObjects.Arc[];

  // Constants
  public MAX_NUM_OF_DOTS: number;

  // Parent component + Reference components
  private Plane: Plane;
  private Symbol: PlaneSymbol;

  constructor(plane: Plane, symbol: PlaneSymbol) {
    super(plane.scene);

    // Common setup
    this.scene.add.existing(this);
    this.Plane = plane;
    this.Symbol = symbol;

    // Init: Sub components
    this.DotList = [];
    this.add(this.DotList);

    // Init: Constants
    this.MAX_NUM_OF_DOTS = 7;

    // Sync update with FPS (set in Phaser Config)
    this.scene.physics.world.on('worldstep', () => {
      this.addNewDot();
      this.removeOldDots();
    });
  }

  private addNewDot() {
    const planePos = this.Plane.getPosition();

    const DOT_RADIUS = 1.5;
    const DOT_COLOR = ColorKeys.PPS_YELLOW;

    // Setup: Dot
    const dot = new Phaser.GameObjects.Arc(
      this.scene,
      planePos.x,
      planePos.y,
      DOT_RADIUS,
      0,
      360,
      false,
      DOT_COLOR
    );
    this.scene.add.existing(dot);

    this.DotList.push(dot);
  }

  private removeOldDots() {
    while (this.DotList.length > this.MAX_NUM_OF_DOTS) {
      const oldDot = this.DotList.shift();
      oldDot?.destroy();
    }
  }
}
