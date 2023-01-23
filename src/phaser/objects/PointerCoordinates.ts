import Phaser from 'phaser';
import RadarScene from '../scenes/RadarScene';
import { DomEvents } from '../types/DomEvents';

/**
 * Returns ON CLICK pointer coordinates:
 * 1) Actual = literal pixel coordinates
 * on display
 * 2) Relative = coordinates as a ratio (between 0 - 1)
 * relative to viewport height
 *
 *  Assumes scene aspect ratio is SQUARE.
 */
export default class PointerCoordinateLogger {
  private Scene: RadarScene;
  public Actual: Phaser.Math.Vector2;
  public Relative: Phaser.Math.Vector2;

  constructor(scene: RadarScene) {
    this.Scene = scene;
    this.Actual = new Phaser.Math.Vector2(0, 0);
    this.Relative = new Phaser.Math.Vector2(0, 0);

    scene.input.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      this.getCoordinates(pointer);
    });
  }

  private getCoordinates(pointer: Phaser.Input.Pointer) {
    // Debug:
    if (this.Scene.IS_DEBUG_MODE === false) return;

    const x = pointer.x;
    const y = pointer.y;

    this.Actual = this.Actual.set(x, y);

    const displayHeight = this.Scene.cameras.main.height;
    const relativeX: number = this.Actual.x / displayHeight;
    const relativeY: number = this.Actual.y / displayHeight;

    this.Relative = this.Relative.set(relativeX, relativeY);

    this.logActual();
    this.logRelativeToHeight();
  }

  logActual() {
    console.log(`Click @ actual coord: ${[this.Actual.x, this.Actual.y]}`);
  }

  logRelativeToHeight() {
    const formatFloatX = this.Relative.x.toFixed(3);
    const formatFloatY = this.Relative.y.toFixed(3);

    console.log(`Click @ relative coord: ${[formatFloatX, formatFloatY]}`);
    navigator.clipboard.writeText(`${formatFloatX}, ${formatFloatY}`);
  }
}
