import RadarScene from '../scenes/RadarScene';
import { ColorKeys } from '../types/ColorKeys';

export default class CursorHalo extends Phaser.GameObjects.Arc {
  constructor(scene: RadarScene) {
    super(scene, 0, 0, 57, 0, 360);

    this.scene.add.existing(this);

    this.isStroked = true;
    this.setStrokeStyle(1, ColorKeys.PTL_GREEN);

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.setPosition(pointer.x, pointer.y);
    });
  }

  preUpdate() {
    this.updatePointerPosition();
  }

  private updatePointerPosition() {}
}
