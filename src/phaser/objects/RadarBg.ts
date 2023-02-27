import Phaser from 'phaser';
import RadarScene from '../scenes/RadarScene';
import { TerminalPosition } from '../types/SimTypes';

export default class RadarBg extends Phaser.GameObjects.Image {
  constructor(scene: RadarScene, assetKey: string) {
    const cameraCenterX = scene.cameras.main.centerX;
    const cameraCenterY = scene.cameras.main.centerY;

    super(scene, cameraCenterX, cameraCenterY, assetKey);

    const cameraHeight = scene.cameras.main.height;

    let IMG_SCALE = 1.5;
    if (scene.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL) {
      IMG_SCALE = 1.6;
    }
    const IMG_ALPHA = 0.75;

    const scaledHeight = cameraHeight * IMG_SCALE;
    this.setDisplaySize(scaledHeight, scaledHeight);

    this.setAlpha(IMG_ALPHA);
    this.setOrigin(0.5, 0.5);

    scene.add.existing(this);
  }
}
