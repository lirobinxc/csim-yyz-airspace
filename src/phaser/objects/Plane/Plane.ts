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
import PlaneBehaviour from './PlaneBehaviour';
import PlanePTL from './PlanePTL';
import RadarScene from '../../scenes/RadarScene';
import { GameObjectOptions } from '../../types/GameObjectOptions';
import PlaneHistoryTrail from './PlaneHistoryTrail';

export interface PlanePerformance {
  speed: {
    initialClimb: number; // to 5000 feet
    normalClimb: number; // 5000 to FL240
    maxCruise: number;
    maxBelow10k: number;
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
  takeoffData: {
    assignedAlt: number;
    depRunway: DepRunwayAll;
    isNADP1: boolean;
  };
  handoffData: {
    alt: number;
    sector: TerminalSectors | AdjacentSectors;
  };
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
    assigned: number;
    directTo: WaypointNamesAll | null;
  };
  climbRate: {
    current: number;
    assigned: number;
  };
  isClimbing: boolean;
  isDescending: boolean;
  isLeveling: boolean; // TO DO: not yet implemented in PlaneBehaviour
  completedSidHeading: boolean;
}

export default class Plane extends Phaser.GameObjects.Container {
  // Plane Properties
  public Properties: PlaneProperties;
  public Commands: PlaneCommands;
  public Performance: PlanePerformance;
  public Options: GameObjectOptions;

  // CONSTANTS
  public DEFAULT_DATATAG_SPACING: number; // px; horizontal space between DataTag & Symbol
  public SHOW_PTL: boolean;

  // Parent scene
  private Scene: RadarScene;

  // Subcomponents
  private Symbol: PlaneSymbol;
  private DataTag: PlaneDataTag;
  private TagLine: PlaneDataTagLine;
  private PTL: PlanePTL;
  private HistoryTrail: PlaneHistoryTrail;
  private Behaviour: PlaneBehaviour;

  constructor(
    scene: RadarScene,
    props: PlaneProperties,
    options: GameObjectOptions
  ) {
    super(scene);

    // Common setup
    scene.add.existing(this);
    scene.physics.add.existing(this); // Enable physics
    this.Scene = scene;

    this.setDepth(10);
    this.DEFAULT_DATATAG_SPACING = 6; // px
    this.SHOW_PTL = false;

    // Init: Name
    this.name = props.acId.abbrev;

    // Init: Plane data
    this.Properties = props;
    this.Performance = this.initPlanePerformance(props);
    this.Commands = this.initPlaneCommands(props, this.Performance);
    this.Options = options;

    // Attach objs: Plane Subcomponents
    this.Symbol = new PlaneSymbol(this);
    this.DataTag = new PlaneDataTag(this);
    this.TagLine = new PlaneDataTagLine(this, this.Symbol, this.DataTag);
    this.PTL = new PlanePTL(this, this.Symbol, 60);
    this.HistoryTrail = new PlaneHistoryTrail(this, this.Symbol);
    this.add([
      this.HistoryTrail,
      this.PTL,
      this.Symbol,
      this.TagLine,
      this.DataTag,
    ]);

    // Attach: Behaviour logic
    this.Behaviour = new PlaneBehaviour(this, this.DataTag);

    // Setup: Plane Container @ runway origin
    this.setX(this.initRunwayOrigin(props).x);
    this.setY(this.initRunwayOrigin(props).y);

    // Setup: DataTag
    this.updateDataTagPosition();

    // Setup: PTL
    this.PTL.setVisible(this.SHOW_PTL);

    // Debug
    if (options.isDebug) {
      this.SHOW_PTL = true;
      this.PTL.TIME_IN_SEC = 600;
    }
  }

  preUpdate() {
    this.updateDataTagPosition();
  }

  /**
   * Return Vector2 (x,y) coordinates
   * of the Plane object, centered on the Symbol.
   */
  public getPosition() {
    const coord = new Phaser.Math.Vector2(this.x, this.y);
    return coord;
  }

  public togglePTL() {
    this.SHOW_PTL = !this.SHOW_PTL;

    this.PTL.setVisible(this.SHOW_PTL);
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

    const runwayHeading = getRunwayHeading(
      acProps.takeoffData.depRunway
    ).initial;

    const initialCommands: PlaneCommands = {
      speed: {
        current: acPerf.speed.initialClimb + 800, // TEMP: should be - 80
        assigned: acPerf.speed.initialClimb,
      },
      altitude: {
        current: 0,
        assigned: acProps.takeoffData.assignedAlt,
      },
      heading: {
        current: runwayHeading,
        assigned: runwayHeading,
        directTo: null,
      },
      climbRate: {
        current: 0,
        assigned: acPerf.climbRate.initialClimb,
      },
      isClimbing: false,
      isDescending: false,
      isLeveling: false,
      completedSidHeading: false,
    };

    return initialCommands;
  }

  private initRunwayOrigin(acProps: PlaneProperties): Phaser.Math.Vector2 {
    if (!acProps.takeoffData.depRunway) {
      throw new Error(`Could not determine runway origin for: ${acProps.acId}`);
    }

    const rwyOrigins = this.Scene.RunwayOrigins;

    const origin = rwyOrigins.getOrigin(acProps.takeoffData.depRunway);
    return origin;
  }
}
