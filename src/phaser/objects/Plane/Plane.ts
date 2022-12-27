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
import { getRunwayHeading } from '../../config/RunwayHeadingConfig';
import PlaneDataTagLine from './PlaneDataTagLine';

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
    destination: string;
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
  isClimbing: boolean;
  isDescending: boolean;
}

export default class Plane extends Phaser.GameObjects.Container {
  // Plane Properties
  private Performance: PlanePerformance;
  public Properties: PlaneProperties;
  public Commands: PlaneCommands;

  // CONSTANTS
  public DEFAULT_DATATAG_SPACING: number; // px; horizontal space between DataTag & Symbol

  // Subcomponents
  private Symbol: PlaneSymbol;
  private DataTag: PlaneDataTag;
  private TagLine: PlaneDataTagLine;

  constructor(scene: Phaser.Scene, props: PlaneProperties) {
    super(scene);

    // Common setup
    scene.add.existing(this);
    this.setDepth(10);
    this.DEFAULT_DATATAG_SPACING = 6; // px

    // Init: Name
    this.name = props.acId.abbrev;

    // Init: Plane data
    this.Properties = props;
    this.Performance = this.initPlanePerformance(props);
    this.Commands = this.initPlaneCommands(props, this.Performance);

    // Attach objs: Plane Subcomponents
    this.Symbol = new PlaneSymbol(this);
    this.DataTag = new PlaneDataTag(this);
    this.TagLine = new PlaneDataTagLine(this, this.Symbol, this.DataTag);

    this.add([this.Symbol, this.DataTag, this.TagLine]);

    // Setup: Plane obj @ runway origin
    this.setX(this.initRunwayOrigin(props).x);
    this.setY(this.initRunwayOrigin(props).y);

    // Setup: Plane Data Tag
    this.updateDataTagPosition();
  }

  preUpdate() {
    this.updateDataTagPosition();
  }

  private updateDataTagPosition() {
    if (this.DataTag.isDefaultPosition) {
      const symbolRightCenter = this.Symbol.getRightCenter();
      this.DataTag.setPosition(
        symbolRightCenter.x + this.DEFAULT_DATATAG_SPACING,
        symbolRightCenter.y
      );
    }
  }

  private initPlanePerformance(props: PlaneProperties): PlanePerformance {
    const performanceData = PlanePerformanceConfig[props.acModel];

    if (!performanceData) {
      throw new Error(
        `Could not find PlanePerformance data for: ${props.acModel}`
      );
    }
    return performanceData;
  }

  private initPlaneCommands(
    acProps: PlaneProperties,
    acPerf: PlanePerformance
  ): PlaneCommands {
    if (!acPerf) {
      throw new Error(
        `Could not find PlanePerformance data for Plane: ${this.name}`
      );
    }

    const initialCommands: PlaneCommands = {
      speed: {
        current: acPerf.speed.initialClimb,
        assigned: acPerf.speed.initialClimb,
      },
      altitude: {
        current: 0,
        assigned: acProps.acType === AcType.JET ? 50 : 30,
      },
      heading: { ...getRunwayHeading(acProps.depRunway) },
      climbRate: {
        current: 0,
        assigned: acPerf.climbRate.initialClimb,
      },
      isClimbing: true,
      isDescending: false,
    };

    return initialCommands;
  }

  private initRunwayOrigin(props: PlaneProperties): Phaser.Math.Vector2 {
    if (!this.Properties.depRunway) {
      throw new Error(`Could not determine runway origin for: ${props.acId}`);
    }

    const rwyOrigins = new RunwayOrigins(this.scene, { isDebug: false });

    const origin = rwyOrigins.getOrigin(props.depRunway);
    return origin;
  }
}
