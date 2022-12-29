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

  private WpText: Phaser.GameObjects.Text;
  private showName: boolean;

  constructor(scene: RadarScene, waypointData: WaypointDataAll) {
    const cameraHeight = scene.cameras.main.height;
    const actualX = waypointData.relativeCoord.x * cameraHeight;
    const actualY = waypointData.relativeCoord.y * cameraHeight;

    const CIRCLE_RADIUS = 8;

    super(scene, actualX, actualY, CIRCLE_RADIUS);
    this.name = waypointData.name;
    this.showName = false;

    // TEMP
    // console.log(cameraHeight, waypointData);

    // Add object to the scene
    scene.add.existing(this);

    this.setDepth(1);
    this.setInteractive();

    if (scene.Options.isDebug) {
      const colorPink = ColorKeys.DEBUG_PINK;
      scene.input.enableDebug(this, colorPink);
    }

    // Attach new TEXT object: Waypoint Name
    this.WpText = this.scene.add.text(
      this.getTopCenter().x,
      this.getTopCenter().y,
      waypointData.name,
      genWaypointTextStyles(waypointData.type)
    );
    this.WpText.setOrigin(0.5, 1);

    // Toggle display name
    this.on(DomEvents.PointerDown, () => {
      this.showName = !this.showName;
    });
  }

  preUpdate() {
    if (this.showName) {
      this.WpText.setVisible(true);
    } else {
      this.WpText.setVisible(false);
    }
  }
}
