import Phaser from 'phaser';
import Plane from './Plane';

export default class PlaneDataTag extends Phaser.GameObjects.Text {
  private Plane: Plane;

  constructor(plane: Plane) {
    super(plane.scene, 0, 0, '', {});

    this.Plane = plane;

    this.setText([plane.Properties.acId.abbrev, '', '']);

    this.setOrigin(0.5, 0.5);
  }
}
