import RadarScene from '../scenes/RadarScene';
import { DomEvents } from '../types/DomEvents';

export default class DebugButton extends Phaser.GameObjects.Text {
  // CONSTANTS
  private BUTTON_TEXT: string;

  private Scene: RadarScene;

  constructor(scene: RadarScene) {
    super(scene, 0, 0, '', {});
    this.Scene = scene;

    // Common setup
    this.scene.add.existing(this);

    // Setup: THIS
    this.BUTTON_TEXT = this.genButtonText();

    this.setText(this.BUTTON_TEXT);

    this.setInteractive();
    this.on(DomEvents.POINTER_DOWN, () => {
      this.Scene.Options.isDebug = !this.Scene.Options.isDebug;
      this.setText(this.genButtonText());
    });
  }

  private genButtonText() {
    return `Debug Mode: ${this.Scene.Options.isDebug ? 'ON' : 'OFF'}`;
  }
}
