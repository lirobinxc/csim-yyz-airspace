import Phaser from 'phaser';

import { Rwy06sWaypointList } from '../config/Rwy06sWaypoints';
import RadarBg from '../objects/RadarBg';
import Waypoint from '../objects/Waypoint';
import type { GameObjectOptions } from '../types/GameObjectOptions';
import { RadarSceneKeys } from '../types/SceneKeys';
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

export default class RadarScene extends Phaser.Scene {
  public Waypoints!: Waypoint[];
  public PlaneList!: Phaser.GameObjects.Group;
  public Options: GameObjectOptions;

  // Template props
  private SCENE_KEY: RadarSceneKeys;
  private ASSET_KEY: AssetKeys;

  constructor(sceneKey: RadarSceneKeys, options: GameObjectOptions) {
    super(RadarSceneKeys.RADAR_06s);

    this.Waypoints = [];
    this.PlaneList = new Phaser.GameObjects.Group(this);
    this.Options = options;

    // Init: Template props
    this.SCENE_KEY = sceneKey;
    this.ASSET_KEY = AssetKeys.RADAR_06s;
  }

  init() {}

  preload() {
    switch (this.SCENE_KEY) {
      case RadarSceneKeys.RADAR_06s:
        this.load.image(AssetKeys.RADAR_06s, img_Radar06s);
        this.ASSET_KEY = AssetKeys.RADAR_06s;
        break;
      default:
        throw new Error(
          `There is a problem with the SCENE_KEY provided for the RadarScene: ${this.SCENE_KEY}`
        );
    }
    this.load.image(AssetKeys.PPS_SYMBOL, img_PpsSymbol);
    this.load.bitmapFont(
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      fontTexture_DejaVuMonoBold,
      fontXml_DejaVuMonoBold
    );
  }

  create() {
    // Create: Background Image
    new RadarBg(this, this.ASSET_KEY);
    console.log({ Rwy06sWaypointDataList: Rwy06sWaypointList });
    // Create: Waypoints Layer
    switch (this.SCENE_KEY) {
      case RadarSceneKeys.RADAR_06s:
        Rwy06sWaypointList.forEach((waypointData) => {
          this.Waypoints.push(new Waypoint(this, waypointData));
        });
        break;
      default:
        throw new Error(
          `There is a problem with the SCENE_KEY provided for the RadarScene: ${this.SCENE_KEY}`
        );
    }

    // Debug:
    if (this.Options.isDebug) {
      this.debug();
    }

    // TEMP Create: Test Plane
    const newPlane = new Plane(this, testPlaneProps, this.Options);
    this.PlaneList.add(newPlane);

    // TEMP: On click
    this.input.on(DomEvents.PointerDown, () => {
      // const newPlane2 = new Plane(this, testPlaneProps);
      // this.PlaneList.push(newPlane2);
    });
  }

  update() {
    // TEMP
    const testPlane: Plane = this.PlaneList.getMatching(
      'name',
      testPlaneProps.acId.abbrev
    )[0];

    const thisCoord = new Phaser.Math.Vector2(testPlane.x, testPlane.y);

    const backupCoord = new Phaser.Math.Vector2(0, 0);
    const wp = this.children.getByName('KEDSI');

    if (wp instanceof Waypoint) {
      const wpCoord = wp.getCenter();
      const rad = Phaser.Math.Angle.BetweenPoints(thisCoord, wpCoord);
      // const deg = Phaser.Math.RadToDeg(rad);
      const deg = convertRadiansToHeading(rad);
      const degCeil = Math.ceil(deg);
      testPlane.Commands.heading.assigned = degCeil;
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
