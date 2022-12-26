import Phaser from 'phaser';
import {
  AcModel,
  AcType,
  AcWTC,
  DepRunwayAll,
} from '../../types/AircraftTypes';
import PlaneDataTag from './PlaneDataTag';
import PlaneSymbol from './PlaneSymbol';
import { WaypointNamesAll } from '../../config/shared/WaypointsCollection';
import RunwayOrigins from '../../config/RunwayOrigins';
import { AdjacentSectors, TerminalSectors } from '../../types/AirspaceTypes';
import { PlanePerformanceConfig } from '../../config/PlanePerformanceConfig';

export interface PlanePerformance {
  speed: {
    initialClimb: number; // to 5000 feet
    normalClimb: number; // 5000 to FL240
    cruise: number;
  };
  climbRate: {
    initialClimb: number;
    normalClimb: number;
  };
  accel: number;
}

export interface PlaneProperties {
  acId: { abbrev: string; spoken: string };
  acType: AcType;
  acModel: AcModel;
  acWtc: AcWTC;
  filedData: {
    route: WaypointNamesAll[];
    alt: number;
    speed: number;
  };
  handoffData: {
    alt: number;
    sector: TerminalSectors | AdjacentSectors;
  };
  depRunway: DepRunwayAll;
}

export interface PlaneCommands {
  speed: {
    current: number;
    assigned: number;
  };
  altitude: {
    current: number;
    assigned: number;
  };
  heading: {
    current: number;
    assigned: number | Phaser.Math.Vector2;
  };
  climbRate: {
    current: number;
    assigned: number;
  };
}

export default class Plane extends Phaser.GameObjects.Container {
  // Plane Properties
  private Performance: PlanePerformance;
  public Properties: PlaneProperties;
  public Commands: PlaneCommands;

  // Plane Subcomponents
  private Symbol: PlaneSymbol;
  private DataTag: PlaneDataTag;

  constructor(scene: Phaser.Scene, props: PlaneProperties) {
    super(scene);

    // Common setup tasks
    scene.add.existing(this);
    this.name = props.acId.abbrev;

    // Init: Plane data
    this.Properties = props;
    this.Performance = this.getPlanePerformance(props);
    this.Commands = {} as PlaneCommands;

    // Attach obj: Plane Subcomponents
    this.Symbol = new PlaneSymbol(this);
    this.DataTag = new PlaneDataTag(this);

    this.add(this.Symbol);
    this.add(this.DataTag);

    // Setup: Plane Symbol
    this.setX(this.getRunwayOrigin(props).x);
    this.setY(this.getRunwayOrigin(props).y);

    // Setup: Plane Data Tag
    const symbolRightCenter = this.Symbol.getRightCenter();
    console.log({ symbolRightCenter });

    this.DataTag.setPosition(symbolRightCenter.x, symbolRightCenter.y);
  }

  preUpdate() {
    const symbolRightCenter = this.Symbol.getRightCenter();
    console.log({ symbolRightCenter });

    this.DataTag.setPosition(symbolRightCenter.x, symbolRightCenter.y);
  }

  private getPlanePerformance(props: PlaneProperties): PlanePerformance {
    const performanceData = PlanePerformanceConfig[props.acModel];

    if (!performanceData) {
      throw new Error(
        `Could not find PlanePerformance data for: ${props.acModel}`
      );
    }
    return performanceData;
  }

  private getRunwayOrigin(props: PlaneProperties): Phaser.Math.Vector2 {
    if (!this.Properties.depRunway) {
      throw new Error(`Could not determine runway origin for: ${props.acId}`);
    }

    const rwyOrigins = new RunwayOrigins(this.scene, { isDebug: false });

    const origin = rwyOrigins.getOrigin(props.depRunway);
    return origin;
  }
}
