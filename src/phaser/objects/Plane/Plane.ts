import Phaser from 'phaser';
import { AcModel, AcType, AcWTC } from '../../types/AircraftTypes';
import PlaneDataTag from './PlaneDataTag';
import PlaneSymbol from './PlaneSymbol';
import {
  WaypointDataAll,
  WaypointNamesAll,
  WaypointNamesRwy06s,
  WaypointNamesRwy24s,
} from '../../types/WaypointTypes';
import { AdjacentSectors, TerminalSectors } from '../../types/SectorTypes';
import { PlanePerformanceConfig } from '../../config/PlanePerformanceConfig';
import { getRunwayHeading } from '../../config/RunwayHeadingConfig';
import PlaneDataTagLine from './PlaneDataTagLine';
import PlaneBehaviour from './PlaneBehaviour';
import PlanePTL from './PlanePTL';
import RadarScene from '../../scenes/RadarScene';
import { GameObjectOptions } from '../../types/GameObjectOptions';
import PlaneHistoryTrail from './PlaneHistoryTrail';
import { SidName } from '../../types/SidTypes';
import { SidRoute06s } from '../../config/Rwy06sSidConfig';
import { DepRunwayAll } from '../../types/AirportTypes';
import { DomEvents } from '../../types/DomEvents';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import PlaneCommandMenu from './PlaneCommandMenu';
import { getSidRoute } from '../../utils/getSidRoute';
import { RadarSceneKeys } from '../../types/SceneKeys';
import { Rwy06sWaypointDict } from '../../config/Rwy06sWaypointConfig';
import {
  determineLeftOrRightTurn,
  TurnDirection,
} from '../../utils/determineLeftOrRightTurn';
import {
  PlaneCommands,
  PlanePerformance,
  PlaneProperties,
} from '../../types/PlaneInterfaces';
import { convertNumToText } from '../../../react/functions/convertNumToText';
import { convertHeadingNumToText } from '../../../react/functions/convertHeadingNumToText';
import FiledRouteLine from '../FiledRouteLine';

export default class Plane extends Phaser.GameObjects.Container {
  // Plane Properties
  public Properties: PlaneProperties;
  public Commands: PlaneCommands;
  public Performance: PlanePerformance;
  public Options: GameObjectOptions;
  public PilotVoice: undefined | SpeechSynthesisVoice;

  // CONSTANTS
  public DEFAULT_DATATAG_SPACING: number; // px; horizontal space between DataTag & Symbol
  public SHOW_PTL: boolean;
  public IS_SELECTED: boolean;
  public SHOW_COMMAND_OPTIONS: boolean;
  public IS_TALKING: boolean;

  // Parent scene
  public Scene: RadarScene;

  // Subcomponents
  private Symbol: PlaneSymbol;
  private DataTag: PlaneDataTag;
  private TagLine: PlaneDataTagLine;
  private PTL: PlanePTL;
  private HistoryTrail: PlaneHistoryTrail;
  // private PlaneRouteLine: PlaneRouteLine;
  private Behaviour: PlaneBehaviour;
  public CommandMenu: PlaneCommandMenu;

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
    this.IS_SELECTED = false;
    this.SHOW_COMMAND_OPTIONS = false;
    this.IS_TALKING = false;

    // Init: Name
    this.name = props.acId.code;

    // Init: Plane data
    this.Properties = props;
    this.Performance = this.initPlanePerformance(props);
    this.Commands = this.initPlaneCommands(props, this.Performance);
    this.Options = options;
    this.PilotVoice = undefined;
    // Attach objs: Plane Subcomponents
    this.Symbol = new PlaneSymbol(this);
    this.DataTag = new PlaneDataTag(this);
    this.TagLine = new PlaneDataTagLine(this, this.Symbol, this.DataTag);
    this.PTL = new PlanePTL(this, this.Symbol, 60);
    this.HistoryTrail = new PlaneHistoryTrail(this, this.Symbol);
    // this.PlaneRouteLine = new PlaneRouteLine(this);
    this.CommandMenu = new PlaneCommandMenu(this);
    this.add([
      // this.PlaneRouteLine,
      this.HistoryTrail,
      this.CommandMenu,
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

    // Input: On click Symbol
    this.Symbol.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      this.Scene.events.emit(PhaserCustomEvents.PLANE_SELECTED, this);

      if (pointer.rightButtonDown()) {
      }
    });

    // Input: On hover over Symbol
    this.Symbol.on(DomEvents.POINTER_OVER, () => {
      if (this.IS_SELECTED) return;
      this.setDepth(555);
    });
    this.Symbol.on(DomEvents.POINTER_OUT, () => {
      if (this.IS_SELECTED) return;
      this.setDepth(10);
    });

    // Debug
    this.onDebug();
  }

  preUpdate() {
    this.updateDataTagPosition();
    this.togglePTL();
    this.setPilotVoice();
    this.onDebug();
  }

  public checkIn() {
    this.Commands.hasCheckedIn = true;

    const altitude = this.Commands.altitude;
    const acIdSpoken = this.Properties.acId.spoken;
    const spokenWtc = this.Properties.acWtc === AcWTC.H ? ' Heavy' : '';

    const currAltRounded = `${Math.round(altitude.current / 100) * 100}`;
    const isCheckIn = true;

    const sidOrPropTurnHeading =
      this.Properties.takeoffData.sidOrPropTurnHeading;
    let sayHeading: string | null = null;
    if (sidOrPropTurnHeading && this.Properties.acType === AcType.PROP) {
      sayHeading = `, heading ${convertHeadingNumToText(sidOrPropTurnHeading)}`;
    }
    console.log({ sayHeading });

    this.talk(
      `Departure, ${acIdSpoken}${spokenWtc} with you out of ${currAltRounded} for ${
        altitude.assigned
      } ${sayHeading !== null ? sayHeading : ''}`,
      this,
      isCheckIn
    );
  }

  public commandDirectTo(waypointData: WaypointDataAll) {
    if (!waypointData) return;

    const sidName = this.Properties.filedData.sidName;
    const sidRoute = getSidRoute(this.Scene.RUNWAY_CONFIG, sidName);

    if (sidRoute.find((wp) => wp.name === waypointData.name)) {
      const altitude = this.Commands.altitude;
      const acType = this.Properties.acType;

      let lowAltitudePrefix = '';

      if (acType === AcType.JET && altitude.current < 3600) {
        lowAltitudePrefix = 'After noise,';
      }
      if (acType === AcType.PROP && altitude.current < 3000) {
        lowAltitudePrefix = 'After passing 3000,';
      }

      this.talk(
        `${lowAltitudePrefix} Proceed direct ${waypointData.name}`,
        this
      );
      this.Commands.heading.directTo = waypointData;
      return;
    }

    this.talk(`Unable, ${waypointData.name} is not on our flight plan`, this);
    return;
  }

  public commandHeading(desiredHeading: number) {
    if (!desiredHeading) return;

    const spokenHeading = desiredHeading
      .toString()
      .padStart(3, '0')
      .split('')
      .join(' ');

    const turnDirection = determineLeftOrRightTurn(
      this.Commands.heading.current,
      desiredHeading
    );

    const altitude = this.Commands.altitude;
    const acType = this.Properties.acType;

    let lowAltitudePrefix = '';

    if (acType === AcType.JET && altitude.current < 3600) {
      lowAltitudePrefix = 'After noise,';
    }
    if (acType === AcType.PROP && altitude.current < 3000) {
      lowAltitudePrefix = 'After passing 3000,';
    }

    if (turnDirection === TurnDirection.LEFT) {
      this.talk(
        `${lowAltitudePrefix} Turn left heading ${spokenHeading}`,
        this
      );
    } else if (
      turnDirection === TurnDirection.RIGHT ||
      turnDirection === TurnDirection.EITHER
    ) {
      this.talk(
        `${lowAltitudePrefix} Turn right heading ${spokenHeading}`,
        this
      );
    } else {
      this.talk(`Maintain heading ${spokenHeading}`, this);
    }

    this.Commands.heading.directTo = null;
    this.Commands.heading.assigned = desiredHeading;
    return;
  }

  public commandAltitude(desiredAlt: number) {
    if (!desiredAlt) return;

    let spokenAlt: string | number = desiredAlt;

    if (desiredAlt >= 18000) {
      const flightLevel = desiredAlt / 100;
      const spokenFlightLevel = flightLevel.toString().split('').join(' ');
      spokenAlt = `Flight Level ${spokenFlightLevel}`;
    }

    if (this.Commands.altitude.current < desiredAlt) {
      this.talk(`Climb ${spokenAlt}`, this);
      this.Commands.altitude.assigned = desiredAlt;
      return;
    }
    if (this.Commands.altitude.current > desiredAlt) {
      this.talk(`Descend ${spokenAlt}`, this);
      this.Commands.altitude.assigned = desiredAlt;
      return;
    }
    this.talk(`Maintain ${spokenAlt}`, this);
    return;
  }

  public commandSpeed(desiredSpeed: number) {
    if (!desiredSpeed) return;

    if (
      this.Commands.speed.current < desiredSpeed ||
      this.Commands.speed.current > desiredSpeed
    ) {
      this.talk(`Speed ${desiredSpeed} knots`, this);
      this.Commands.speed.assigned = desiredSpeed;
      return;
    }
    this.talk(`Maintain speed ${desiredSpeed} knots`, this);
    return;
  }

  /**
   * Return Vector2 (x,y) coordinates
   * of the Plane object, centered on the Symbol.
   */
  public getPosition() {
    const coord = new Phaser.Math.Vector2(this.x, this.y);
    return coord;
  }

  public talk(text: string, plane: Plane, isCheckIn: boolean = false) {
    this.Scene.events.emit(PhaserCustomEvents.PILOT_SPEECH, {
      text,
      plane,
      isCheckIn,
    });
  }

  private onDebug() {
    if (this.Options.isDebug) {
      this.PTL.TIME_IN_SEC = 60;
      this.SHOW_PTL = true;
    } else {
      this.PTL.TIME_IN_SEC = 60;
      this.SHOW_PTL = false;
    }
  }

  private ifPlaneIsSelected() {
    if (this.IS_SELECTED) {
    }
  }

  private togglePTL() {
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

  private setPilotVoice() {
    if (this.PilotVoice) return;
    if (!this.Scene.Speech) return;

    const voices = this.Scene.Speech.getVoices();
    if (!voices) return;

    const engVoices = voices.filter(
      (voice) =>
        voice.lang[0] === 'e' &&
        voice.lang[1] === 'n' &&
        voice.name !== 'Google US English' &&
        voice.name !== 'Google UK English Female' &&
        voice.name !== 'Google UK English Male'
    );

    this.PilotVoice = engVoices[Phaser.Math.Between(0, voices.length - 1)];
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
        current: acPerf.speed.initialClimb - 80,
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
      onSidOrPropHeading: false,
      hasCheckedIn: false,
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
