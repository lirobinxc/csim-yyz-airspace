import Phaser from 'phaser';
import {
  WaypointDataAllDep,
  WaypointNamesAllDep,
} from '../types/WaypointTypesDep';
import { genWaypointTextStyles } from '../config/TextStyleConfig';
import RadarScene from '../scenes/RadarScene';
import { ColorKeys } from '../types/ColorKeys';
import { DomEvents } from '../types/DomEvents';
import { PhaserCustomEvents } from '../types/CustomEvents';

export default class Waypoint extends Phaser.GameObjects.Arc {
  public name: WaypointNamesAllDep;

  private Scene: RadarScene;
  private Label: Phaser.GameObjects.Text;

  public SHOW_NAME: boolean;
  public WAYPOINT_DATA: WaypointDataAllDep;

  constructor(scene: RadarScene, waypointData: WaypointDataAllDep) {
    const CIRCLE_RADIUS = 8;

    super(
      scene,
      waypointData.getDisplayCoord().x,
      waypointData.getDisplayCoord().y,
      CIRCLE_RADIUS
    );

    // Common setup
    scene.add.existing(this);
    this.Scene = scene;
    this.name = waypointData.name;
    this.SHOW_NAME = false;
    this.WAYPOINT_DATA = waypointData;

    this.setDepth(1);
    this.setInteractive({ cursor: 'pointer' });

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
    this.on(DomEvents.POINTER_DOWN, () => {
      if (this.Scene.SELECTED_PLANE === null || !this.Scene.SELECTED_PLANE) {
        this.SHOW_NAME = !this.SHOW_NAME;
      }

      this.Scene.events.emit(PhaserCustomEvents.WP_CLICKED, this.WAYPOINT_DATA);
    });
  }

  preUpdate() {
    this.toggleDisplayName();
    this.toggleDebug();
  }

  private toggleDisplayName() {
    if (this.SHOW_NAME) {
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
