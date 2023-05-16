import { MasterEngineOptions } from '../MasterEngineOptions';
import RadarScene from '../scenes/RadarScene';
import { AssetKeys } from '../types/AssetKeys';
import { DomEvents } from '../types/DomEvents';

export default class OptionsSidebar extends Phaser.GameObjects.Layer {
  private DebugButton: Phaser.GameObjects.BitmapText;
  private GameSpeedButton: Phaser.GameObjects.BitmapText;

  // Parent
  private Scene: RadarScene;

  constructor(scene: RadarScene) {
    super(scene);
    this.Scene = scene;

    const FONT_SIZE = 14;
    this.DebugButton = new Phaser.GameObjects.BitmapText(
      scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      'Debug',
      FONT_SIZE
    );
    this.GameSpeedButton = new Phaser.GameObjects.BitmapText(
      scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      'Speed Up',
      FONT_SIZE
    );

    // Common setup
    this.add(this.DebugButton);
    this.add(this.GameSpeedButton);
    this.scene.add.existing(this);

    // Setup: Buttons
    const allButtons = this.getChildren() as Phaser.GameObjects.BitmapText[];

    allButtons.forEach((button, idx) => {
      button.setPosition(0, FONT_SIZE * idx);
    });

    // Setup: Debug Button
    this.DebugButton.setText(this.genButtonText());
    this.DebugButton.setInteractive();
    this.DebugButton.on(DomEvents.POINTER_DOWN, () => {
      this.Scene.IS_DEBUG_MODE = !this.Scene.IS_DEBUG_MODE;
      this.DebugButton.setText(this.genButtonText());
    });

    // Setup: SpeedUp Button
    // this.updateGameSpeedButton();
  }

  preUpdate() {
    // this.updateGameSpeedButton();
  }

  private genButtonText() {
    return `Debug Mode: ${this.Scene.IS_DEBUG_MODE ? 'ON' : 'OFF'}`;
  }

  // private updateGameSpeedButton() {
  //   this.GameSpeedButton.setText(
  //     `Game Speed: x${this.Scene.GAME_SPEED_MULTIPLIER}`
  //   );
  // }
}
