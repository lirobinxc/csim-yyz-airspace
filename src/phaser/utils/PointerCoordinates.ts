import Phaser from 'phaser';
import { DomEvents } from '../types/DomEvents';

/**
 * Returns ON CLICK pointer coordinates:
 * 1) Actual = literal pixel coordinates
 * on display
 * 2) Relative = coordinates as a ratio (between 0 - 1)
 * relative to viewport height
 *
 *  Assumes scene aspect ratio is SQUARE.
 *
 * @date 12/24/2022 - 3:18:18 PM
 *
 * @export
 * @class PointerCoordinates
 * @typedef {PointerCoordinates}
 */
export default class PointerCoordinates {
  private scene: Phaser.Scene;
  public Actual: Phaser.Math.Vector2;
  public Relative: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.Actual = new Phaser.Math.Vector2(0, 0);
    this.Relative = new Phaser.Math.Vector2(0, 0);

    scene.input.on(
      DomEvents.PointerDown,
      (pointer: Phaser.Input.Pointer) => this.getCoordinates(pointer),
      scene
    );
  }

  private getCoordinates(pointer: Phaser.Input.Pointer) {
    const x = pointer.x;
    const y = pointer.y;

    this.Actual = this.Actual.set(x, y);

    const displayHeight = this.scene.cameras.main.height;
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
    // console.log(
    //   `Click @ relative coord: ${[this.Relative.x, this.Relative.y]}`
    // );
  }
}
