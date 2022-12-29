import Phaser from 'phaser';
import {
  WaypointDataAll,
  WaypointNamesAll,
} from '../config/shared/WaypointsCollection';
import { genWaypointTextStyles } from '../config/TextStyleConfig';
import RadarScene from '../scenes/RadarScene';
import { ColorKeys } from '../types/ColorKeys';
import { DomEvents } from '../types/DomEvents';

export default class Waypoint extends Phaser.GameObjects.Arc {
  public name: WaypointNamesAll;

  private Scene: RadarScene;
  private Label: Phaser.GameObjects.Text;
  private showName: boolean;

  constructor(scene: RadarScene, waypointData: WaypointDataAll) {
    const cameraHeight = scene.cameras.main.height;
    const actualX = waypointData.relativeCoord.x * cameraHeight;
    const actualY = waypointData.relativeCoord.y * cameraHeight;

    const CIRCLE_RADIUS = 8;

    super(scene, actualX, actualY, CIRCLE_RADIUS);

    // Common setup
    scene.add.existing(this);
    this.Scene = scene;
    this.name = waypointData.name;
    this.showName = false;

    this.setDepth(1);
    this.setInteractive();

    // Attach new TEXT object: Waypoint Name
    this.Label = this.scene.add.text(
      this.getTopCenter().x,
      this.getTopCenter().y,
      waypointData.name,
      genWaypointTextStyles(waypointData.type)
    );
    this.Label.setOrigin(0.5, 1);

    // Setup: Debug
    const colorPink = ColorKeys.DEBUG_PINK;
    scene.input.enableDebug(this, colorPink);

    // Input: Toggle display name
    this.on(DomEvents.PointerDown, () => {
      this.showName = !this.showName;
    });
  }

  preUpdate() {
    this.toggleDisplayName();
    this.toggleDebug();
  }

  private toggleDisplayName() {
    if (this.showName) {
      this.Label.setVisible(true);
    } else {
      this.Label.setVisible(false);
    }
  }

  private toggleDebug() {
    if (this.Scene.Options.isDebug) {
      this.input.hitAreaDebug.setVisible(true);
    } else {
      this.input.hitAreaDebug.setVisible(false);
    }
  }
}
