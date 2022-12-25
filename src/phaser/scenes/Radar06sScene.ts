import Phaser from 'phaser';

import img_radar0506LR from '../assets/Radar06s.png';
import { Rwy06sWaypointList } from '../config/Rwy06sWaypoints';
import RadarBg from '../objects/RadarBg';
import Waypoint from '../objects/shared/Waypoint';
import type { GameObjectOptions } from '../types/GameObjectOptions';
import { SceneKeys } from '../types/SceneKeys';
import PointerCoordinates from '../utils/PointerCoordinates';
import RunwayOrigins from '../config/RunwayOrigins';

enum Assets {
  Radar06s = 'Radar06s',
}

export default class Radar06sScene extends Phaser.Scene {
  private isDebug: boolean;
  private RunwayOrigins!: RunwayOrigins;

  constructor(options: GameObjectOptions) {
    super(SceneKeys.Radar06s);

    this.isDebug = options?.isDebug;
  }

  init() {
    // Property setup
    this.RunwayOrigins = new RunwayOrigins(this, { isDebug: this.isDebug });
  }

  preload() {
    this.load.image(Assets.Radar06s, img_radar0506LR);
  }

  create() {
    if (this.isDebug) {
      this.debug();
    }

    // Create background image
    new RadarBg(this, Assets.Radar06s);

    // Create waypoints layer
    const waypointsArr = Rwy06sWaypointList.map(
      (item) => new Waypoint(this, item, { isDebug: this.isDebug })
    );
    const waypointsLayer = this.add.layer(waypointsArr);
  }

  update() {}

  debug() {
    new PointerCoordinates(this);
  }
}
