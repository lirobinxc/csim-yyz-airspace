import Phaser from 'phaser';

import { Rwy06sWaypointList } from '../config/Rwy06sWaypoints';
import RadarBg from '../objects/RadarBg';
import Waypoint from '../objects/Waypoint';
import type { GameObjectOptions } from '../types/GameObjectOptions';
import { SceneKeys } from '../types/SceneKeys';
import { AssetKeys } from '../types/AssetKeys';
import PointerCoordinates from '../utils/PointerCoordinates';
import RunwayOrigins from '../config/RunwayOrigins';

import img_Radar06s from '../assets/Radar06s.png';
import img_PpsSymbol from '../assets/PpsSymbol.png';
import Plane, { PlaneProperties } from '../objects/Plane/Plane';
import { AcModel, AcType, AcWTC, DepRunwayYYZ } from '../types/AircraftTypes';
import PlaneSymbol from '../objects/Plane/PlaneSymbol';
import { DomEvents } from '../types/DomEvents';
import { AdjacentSectors } from '../types/AirspaceTypes';

export default class Radar06sScene extends Phaser.Scene {
  public Waypoints!: Waypoint[];
  public PlaneList!: Plane[];

  private isDebug: boolean;

  constructor(options: GameObjectOptions) {
    super(SceneKeys.Radar06s);

    // this.PlaneList = new Phaser.GameObjects.Layer(this);
    this.Waypoints = [];
    this.PlaneList = [];
    this.isDebug = options?.isDebug;
  }

  init() {
    // Property setup
  }

  preload() {
    this.load.image(AssetKeys.Radar06s, img_Radar06s);
    this.load.image(AssetKeys.PpsSymbol, img_PpsSymbol);
  }

  create() {
    if (this.isDebug) {
      this.debug();
    }

    // Create object: Background Image
    new RadarBg(this, AssetKeys.Radar06s);

    // Create objects: Waypoints Layer
    Rwy06sWaypointList.forEach((waypointData) =>
      this.Waypoints.push(
        new Waypoint(this, waypointData, { isDebug: this.isDebug })
      )
    );

    // Create object: Plane
    const testPlaneProps: PlaneProperties = {
      acId: { abbrev: 'ACA123', spoken: 'Air Canada 1-2-3' },
      acType: AcType.JET,
      acModel: AcModel.A343,
      acWtc: AcWTC.M,
      filedData: { alt: 300, route: ['PERLO', 'OMAPA', 'ANCOL'], speed: 300 },
      handoffData: {
        alt: 150,
        sector: AdjacentSectors.HM,
      },
      depRunway: DepRunwayYYZ.RWY_05,
    };

    this.input.on(DomEvents.PointerDown, () => {
      const newPlane = new Plane(this, testPlaneProps);
      this.PlaneList.push(newPlane);
    });
  }

  update() {}

  updatePlaneSpeed() {}

  debug() {
    new PointerCoordinates(this);
    new RunwayOrigins(this, { isDebug: this.isDebug });
  }
}
