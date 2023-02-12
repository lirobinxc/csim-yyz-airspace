import { MasterGameConfig } from '../config/MasterGameConfig';
import RadarScene from '../scenes/RadarScene';
import { AssetKeys } from '../types/AssetKeys';
import { DomEvents } from '../types/DomEvents';

export default class OptionsSidebar extends Phaser.GameObjects.Layer {
  private DebugButton: Phaser.GameObjects.BitmapText;
  private SpeedUpButton: Phaser.GameObjects.BitmapText;

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
    this.SpeedUpButton = new Phaser.GameObjects.BitmapText(
      scene,
      0,
      0,
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      'Speed Up',
      FONT_SIZE
    );

    // Common setup
    this.add(this.DebugButton);
    this.add(this.SpeedUpButton);
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
    this.updateGameSpeedButton();
    this.SpeedUpButton.setInteractive();

    this.SpeedUpButton.on(DomEvents.POINTER_DOWN, () => {
      this.incrementGameSpeed();
      this.updateGameSpeedButton();
    });
  }

  private genButtonText() {
    return `Debug Mode: ${this.Scene.IS_DEBUG_MODE ? 'ON' : 'OFF'}`;
  }

  private updateGameSpeedButton() {
    this.SpeedUpButton.setText(
      `Game Speed: x${this.Scene.GAME_SPEED_MULTIPLIER}`
    );
  }

  private incrementGameSpeed() {
    const multipliers = MasterGameConfig.speedMultipliers;

    const currIdx = multipliers.findIndex(
      (item) => item === this.Scene.GAME_SPEED_MULTIPLIER
    );

    if (multipliers.length === currIdx + 1) {
      this.Scene.GAME_SPEED_MULTIPLIER = multipliers[0];
    } else {
      this.Scene.GAME_SPEED_MULTIPLIER = multipliers[currIdx + 1];
    }
  }
}
