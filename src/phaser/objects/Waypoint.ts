import Phaser from 'phaser';
import {
  WaypointDataAll,
  WaypointNamesAll,
} from '../config/shared/WaypointsCollection';
import { FontColors, genWaypointTextStyles } from '../config/TextStyleConfig';
import { AcType } from '../types/AircraftTypes';
import { DomEvents } from '../types/DomEvents';
import type { GameObjectOptions } from '../types/GameObjectOptions';

export default class Waypoint extends Phaser.GameObjects.Arc {
  public name: WaypointNamesAll;

  private WpText: Phaser.GameObjects.Text;
  private showName: boolean;

  constructor(
    scene: Phaser.Scene,
    waypointData: WaypointDataAll,
    options: GameObjectOptions
  ) {
    const cameraHeight = scene.cameras.main.height;
    const actualX = waypointData.relativeCoord.x * cameraHeight;
    const actualY = waypointData.relativeCoord.y * cameraHeight;

    const CIRCLE_RADIUS = 8;

    super(scene, actualX, actualY, CIRCLE_RADIUS);
    this.name = waypointData.name;
    this.showName = false;

    // Add object to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(1);
    this.setInteractive();

    if (options.isDebug) {
      const colorPink = 0xff0ef4;
      scene.input.enableDebug(this, colorPink);
    }

    // Attach new TEXT object: Waypoint Name
    this.WpText = this.scene.add.text(
      this.getTopCenter().x,
      this.getTopCenter().y,
      waypointData.name,
      genWaypointTextStyles(scene, waypointData.type)
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
