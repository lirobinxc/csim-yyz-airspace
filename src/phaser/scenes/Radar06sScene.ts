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
import { convertRadiansToHeading } from '../utils/convertRadiansToHeading';

export default class Radar06sScene extends Phaser.Scene {
  public Waypoints!: Waypoint[];
  public PlaneList!: Phaser.GameObjects.Group;
  public Options: GameObjectOptions;

  private lastFrameTime: number;

  constructor(options: GameObjectOptions) {
    super(SceneKeys.RADAR_06s);

    // this.PlaneList = new Phaser.GameObjects.Layer(this);
    this.Waypoints = [];
    this.PlaneList = new Phaser.GameObjects.Group(this);
    this.Options = options;
    this.lastFrameTime = 0;
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
    if (this.Options.isDebug) {
      this.debug();
    }

    //TEMP

    // Create object: Background Image
    new RadarBg(this, AssetKeys.RADAR_06s);

    // Create objects: Waypoints Layer
    Rwy06sWaypointList.forEach((waypointData) =>
      this.Waypoints.push(new Waypoint(this, waypointData, this.Options))
    );

    const newPlane = new Plane(this, testPlaneProps, this.Options);
    this.PlaneList.add(newPlane);

    this.input.on(DomEvents.PointerDown, () => {
      // const newPlane2 = new Plane(this, testPlaneProps);
      // this.PlaneList.push(newPlane2);
    });
  }

  update() {
    // TEMP
    const getPlane: Plane = this.PlaneList.getMatching(
      'name',
      testPlaneProps.acId.abbrev
    )[0];

    const thisCoord = new Phaser.Math.Vector2(getPlane.x, getPlane.y);

    const backupCoord = new Phaser.Math.Vector2(0, 0);
    const wp = this.children.getByName('KEDSI');

    if (wp instanceof Waypoint) {
      const wpCoord = wp.getCenter();
      const rad = Phaser.Math.Angle.BetweenPoints(thisCoord, wpCoord);
      // const deg = Phaser.Math.RadToDeg(rad);
      const deg = convertRadiansToHeading(rad);
      const degCeil = Math.ceil(deg);
      console.log({ degCeil });
      getPlane.Commands.heading.assigned = degCeil;
    }
  }

  debug() {
    new PointerCoordinates(this);
    new RunwayOrigins(this, this.Options);
  }
}

// Create object: Plane
const testPlaneProps: PlaneProperties = {
  acId: { abbrev: 'ACA123', spoken: 'Air Canada 1-2-3' },
  acType: AcType.JET,
  acModel: AcModel.B738,
  acWtc: AcWTC.M,
  filedData: {
    alt: 300,
    route: ['GOTIM', 'IKLEN', 'TONNY'],
    speed: 300,
    destination: 'CYOW',
  },
  takeoffData: {
    depRunway: DepRunwayYYZ.RWY_05,
    isNADP1: false,
    assignedAlt: 5000,
  },
  handoffData: {
    alt: 150,
    sector: AdjacentSectors.HM,
  },
};
