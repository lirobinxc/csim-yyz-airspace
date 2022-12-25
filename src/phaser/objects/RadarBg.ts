import Phaser from 'phaser';

export default class RadarBg extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, imageUrl: string) {
    const cameraCenterX = scene.cameras.main.centerX;
    const cameraCenterY = scene.cameras.main.centerY;

    super(scene, cameraCenterX, cameraCenterY, imageUrl);

    const cameraHeight = scene.cameras.main.height;

    const IMG_SCALE = 1.5;
    const IMG_ALPHA = 0.8;

    const scaledHeight = cameraHeight * IMG_SCALE;
    this.setDisplaySize(scaledHeight, scaledHeight);

    this.setAlpha(IMG_ALPHA);
    this.setOrigin(0.5, 0.5);

    scene.add.existing(this);
  }
}
