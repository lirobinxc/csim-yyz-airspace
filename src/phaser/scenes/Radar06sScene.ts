import Phaser from 'phaser';

import { Rwy06sWaypointList } from '../config/Rwy06sWaypoints';
import RadarBg from '../objects/RadarBg';
import Waypoint from '../objects/Waypoint';
import type { GameObjectOptions } from '../types/GameObjectOptions';
import { SceneKeys } from '../types/SceneKeys';
import { AssetKeys } from '../types/AssetKeys';
import PointerCoordinates from '../utils/PointerCoordinates';
import RunwayOrigins from '../config/RunwayOrigins';
import Plane, { PlaneProperties } from '../objects/Plane/Plane';
import { AcModel, AcType, AcWTC, DepRunwayYYZ } from '../types/AircraftTypes';
import { DomEvents } from '../types/DomEvents';
import { AdjacentSectors } from '../types/AirspaceTypes';

import img_Radar06s from '../assets/Radar06s.png';
// import img_Radar06s from '../assets/Radar06s_vector.svg';
import img_PpsSymbol from '../assets/PpsSymbol.png';
import fontTexture_DejaVuMonoBold from '../assets/font/FontDejaVuMonoBold.png';
import fontXml_DejaVuMonoBold from '../assets/font/FontDejaVuMonoBold.xml';

export default class Radar06sScene extends Phaser.Scene {
  public Waypoints!: Waypoint[];
  public PlaneList!: Plane[];

  private isDebug: boolean;

  constructor(options: GameObjectOptions) {
    super(SceneKeys.RADAR_06s);

    // this.PlaneList = new Phaser.GameObjects.Layer(this);
    this.Waypoints = [];
    this.PlaneList = [];
    this.isDebug = options?.isDebug;
  }

  init() {}

  preload() {
    this.load.image(AssetKeys.RADAR_06s, img_Radar06s);
    this.load.image(AssetKeys.PPS_SYMBOL, img_PpsSymbol);
    this.load.bitmapFont(
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      fontTexture_DejaVuMonoBold,
      fontXml_DejaVuMonoBold
    );
  }

  create() {
    if (this.isDebug) {
      this.debug();
    }

    //TEMP

    // Create object: Background Image
    new RadarBg(this, AssetKeys.RADAR_06s);

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
      acWtc: AcWTC.H,
      filedData: {
        alt: 300,
        route: ['GOTIM', 'IKLEN', 'TONNY'],
        speed: 300,
        destination: 'CYOW',
      },
      handoffData: {
        alt: 150,
        sector: AdjacentSectors.HM,
      },
      depRunway: DepRunwayYYZ.RWY_05,
    };

    const newPlane = new Plane(this, testPlaneProps);
    this.PlaneList.push(newPlane);

    this.input.on(DomEvents.PointerDown, () => {
      // const newPlane2 = new Plane(this, testPlaneProps);
      // this.PlaneList.push(newPlane2);
    });
  }

  update() {}

  updatePlaneSpeed() {}

  debug() {
    new PointerCoordinates(this);
    new RunwayOrigins(this, { isDebug: this.isDebug });
  }
}
