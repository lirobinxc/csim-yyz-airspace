import Phaser from 'phaser';
import { AcType, AcWTC } from '../../types/AircraftTypes';
import PlaneDataTag from './PlaneDataTag';
import PlaneSymbol from './PlaneSymbol';
import { WaypointDataDepAll } from '../../types/WaypointTypesDep';
import { PlanePerformanceConfig } from '../../config/PlanePerformanceConfig';
import { getRunwayHeading } from '../../config/RunwayHeadingConfig';
import PlaneDataTagLine from './PlaneDataTagLine';
import PlaneBehaviour from './PlaneBehaviour';
import PlanePTL from './PlanePTL';
import RadarScene from '../../scenes/RadarScene';
import PlaneHistoryTrail from './PlaneHistoryTrail';
import { DomEvents } from '../../types/DomEvents';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import PlaneCommandMenu from './PlaneCommandMenu';
import { getSidRoute } from '../../utils/getSidRoute';
import {
  determineLeftOrRightTurn,
  TurnDirection,
} from '../../utils/determineLeftOrRightTurn';
import {
  PlaneCommands,
  PlanePerformance,
  PlaneProperties,
} from '../../types/PlaneInterfaces';
import { convertHeadingNumToText } from '../../../react/functions/convertHeadingNumToText';
import PlaneHandoffMenu from './PlaneHandoffMenu';
import { getSatRoute } from '../../utils/getSatRoute';
import PlaneCjs from './PlaneCjs';
import { TerminalPosition } from '../../types/SimTypes';
import { getStarRoute } from '../../utils/getStarRoute';
import { getBedpostOrigin } from '../../config/BedpostOrigins';
import RunwayOrigins from '../../config/RunwayOrigins';
import { convertPixelsToMiles } from '../../utils/convertPixelsToMiles';
import {
  ArrBoxDimensions,
  isPlaneInsideArrBox,
} from '../../utils/isPlaneInsideArrBox';
import { IaToolHeadings } from '../../config/IaToolHeadings';
import { DepRunwayYYZ } from '../../types/AirportTypes';
import { RadarSceneKeys } from '../../types/SceneKeys';
import { ArrivalPosition } from '../../types/ArrivalTypes';
import PlaneIaIndicator from './PlaneIaIndicator';

export default class Plane extends Phaser.GameObjects.Container {
  // Plane Properties
  public Properties: PlaneProperties;
  public Commands: PlaneCommands;
  public Performance: PlanePerformance;
  public PilotVoice: undefined | SpeechSynthesisVoice;

  // CONSTANTS
  public DEFAULT_DATATAG_SPACING: number; // px; horizontal space between DataTag & Symbol
  public SHOW_PTL: boolean;
  public IS_SELECTED: boolean;
  public IS_PENDING_DIRECT_TO_COMMAND: boolean;
  public SHOW_COMMAND_OPTIONS: boolean;
  public IS_TALKING: boolean;
  public DEP_HANDOFF_IN_PROGRESS: boolean;
  public ARR_HANDOFF_IN_PROGRESS: boolean;
  public IS_HANDED_OFF: boolean;
  public IN_ARR_BOX: boolean;
  public ARR_INTERCEPT_LOC: boolean;
  public ARR_INTERCEPT_LOC_READ_BACK: boolean;
  public ARR_APPROACH_CLEARANCE: boolean;
  public ARR_APPROACH_CLEARANCE_READ_BACK: boolean;
  public ARR_HAS_INTERCEPTED_LOC: boolean;
  public ARR_ON_BASE_TURN: boolean;
  public DISTANCE_FROM_RUNWAY_THRESHOLD_MILES: number; // in miles

  public DESTROYED: boolean;

  // Parent scene
  public Scene: RadarScene;

  // Subcomponents
  public Symbol: PlaneSymbol;
  public CJS: PlaneCjs;
  public DataTag: PlaneDataTag;
  public TagLine: PlaneDataTagLine;
  public PTL: PlanePTL;
  public HistoryTrail: PlaneHistoryTrail;
  public IaIndicator: PlaneIaIndicator;
  // private PlaneRouteLine: PlaneRouteLine;
  public Behaviour: PlaneBehaviour;
  public CommandMenu: PlaneCommandMenu;
  public HandoffMenu: PlaneHandoffMenu;

  constructor(scene: RadarScene, props: PlaneProperties) {
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
    this.IS_PENDING_DIRECT_TO_COMMAND = false;
    this.DEP_HANDOFF_IN_PROGRESS = false;
    this.ARR_HANDOFF_IN_PROGRESS = true;

    this.IS_HANDED_OFF = false;

    this.IN_ARR_BOX = false;
    this.ARR_INTERCEPT_LOC = false;

    this.ARR_APPROACH_CLEARANCE = false;
    this.ARR_INTERCEPT_LOC_READ_BACK = false;
    this.ARR_APPROACH_CLEARANCE_READ_BACK = false;
    this.ARR_HAS_INTERCEPTED_LOC = false;
    this.ARR_ON_BASE_TURN = false;
    this.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES = 9999; // in miles

    this.DESTROYED = false;

    // Init: Name
    this.name = props.acId.code;

    // Init: Plane data
    this.Properties = props;
    this.Performance = this.initPlanePerformance(props);
    this.Commands = this.initPlaneCommands(props, this.Performance);
    this.PilotVoice = undefined;

    // Attach objs: Plane Subcomponents
    this.Symbol = new PlaneSymbol(this);
    this.CJS = new PlaneCjs(this);
    this.DataTag = new PlaneDataTag(this);
    this.TagLine = new PlaneDataTagLine(this, this.Symbol, this.DataTag);
    this.PTL = new PlanePTL(this, this.Symbol, 120);
    this.HistoryTrail = new PlaneHistoryTrail(this, this.Symbol);
    this.IaIndicator = new PlaneIaIndicator(this);
    this.CommandMenu = new PlaneCommandMenu(this);
    this.HandoffMenu = new PlaneHandoffMenu(this);
    this.add([
      this.CJS,
      this.HistoryTrail,
      this.HandoffMenu,
      this.CommandMenu,
      this.PTL,
      this.Symbol,
      this.TagLine,
      this.DataTag,
    ]);

    // Attach: Behaviour logic
    this.Behaviour = new PlaneBehaviour(this, this.DataTag);

    // Setup: StraightIns come in with Intercept clearance
    if (props.fdeData.arr?.isStraightIn) {
      this.ARR_INTERCEPT_LOC = true;
      this.CommandMenu.COMMAND_CUE.interceptLoc = true;
    }

    // Setup: Plane Container @ origin
    this.setX(this.getPlaneOrigin(props).x);
    this.setY(this.getPlaneOrigin(props).y);

    // Setup: DataTag
    this.updateDataTagPosition();

    // Setup: PTL
    this.PTL.setVisible(this.SHOW_PTL);

    // Input: On click Symbol
    this.Symbol.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) return;
      if (pointer.middleButtonDown()) {
        this.scene.events.emit(
          PhaserCustomEvents.DESTROY_PLANE_BUTTON_CLICKED,
          this
        );
      }

      if (!this.Scene.RBL_ACTIVATED_0 && !this.Scene.RBL_ACTIVATED_1) {
        this.Scene.events.emit(PhaserCustomEvents.PLANE_SELECTED, this);
        return;
      }

      if (this.Scene.RBL_ACTIVATED_0) {
        this.Scene.events.emit(PhaserCustomEvents.RBL_PLANE_0_CLICKED, this);
        return;
      }
      if (this.Scene.RBL_ACTIVATED_1) {
        this.Scene.events.emit(PhaserCustomEvents.RBL_PLANE_1_CLICKED, this);
        return;
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

    // Sync update with FPS
    this.scene.physics.world.on('worldstep', (dt: number) => {
      if (this.DESTROYED) return;

      if (
        this.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL
      ) {
        if (this.IN_ARR_BOX === false) {
          this.IN_ARR_BOX = isPlaneInsideArrBox(this);
        }
        if (this.IN_ARR_BOX === true) {
          this.Scene.Localizers?.hasPlaneInterceptedLocalizer(this);
          this.updateDistanceFromRunwayThreshold();
          this.updateOnBaseTurn();
          // console.log(this.DISTANCE_FROM_RUNWAY_THRESHOLD);
        }
      }
    });
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
    if (sidOrPropTurnHeading && this.Properties.isSatellite) {
      if (typeof sidOrPropTurnHeading === 'number') {
        sayHeading = `, heading ${convertHeadingNumToText(
          sidOrPropTurnHeading
        )}`;
      } else {
        sayHeading = `, direct ${sidOrPropTurnHeading.name}`;
      }
    }
    if (
      !this.Properties.isSatellite &&
      sidOrPropTurnHeading &&
      this.Properties.acType === AcType.PROP
    ) {
      if (typeof sidOrPropTurnHeading === 'number') {
        sayHeading = `, heading ${convertHeadingNumToText(
          sidOrPropTurnHeading
        )}`;
      }
    }

    this.talk(
      `${
        this.Properties.terminalPosition
      }, ${acIdSpoken}${spokenWtc} with you ${
        this.Properties.isSatArrival ? 'level at' : 'out of'
      } ${currAltRounded} ${
        this.Properties.isSatArrival ? '' : `for ${altitude.assigned}`
      } ${sayHeading !== null ? sayHeading : ''}`,
      this,
      isCheckIn
    );
  }

  public commandDirectTo(waypointData: WaypointDataDepAll) {
    if (!waypointData) return;

    const filedRoute = this.getFiledRoute();

    //@ts-ignore
    if (filedRoute.find((wp) => wp.name === waypointData.name)) {
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

    if (
      this.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE
    ) {
      if (acType === AcType.JET && altitude.current < 3600) {
        lowAltitudePrefix = 'After noise,';
      }
      if (acType === AcType.PROP && altitude.current < 3000) {
        lowAltitudePrefix = 'After passing 3000,';
      }
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

  public commandIntercept() {
    this.ARR_INTERCEPT_LOC = true;
    this.talk('Intercept', this);
    return;
  }

  public commandApproach() {
    // Convert runway to spoken
    const arrRunwayNum = this.Properties.arrivalData.arrRunway.split(' ')[2];
    const runwayChars = arrRunwayNum.split('');

    switch (runwayChars[2]) {
      case 'L':
        runwayChars[2] = 'left';
        break;
      case 'R':
        runwayChars[2] = 'right';
        break;
    }

    const spokenRunwayNum = runwayChars.join(' ');

    this.ARR_APPROACH_CLEARANCE = true;
    this.talk(`Cleared ILS Runway ${spokenRunwayNum} approach`, this);
    return;
  }

  public commandCancelIntercept() {
    this.ARR_INTERCEPT_LOC = false;
    return;
  }

  public commandCancelApproach() {
    this.ARR_APPROACH_CLEARANCE = false;
    this.talk('Approach clearance canceled', this);
    return;
  }

  public getFiledRoute() {
    const isDepartureMode =
      this.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE;
    const isArrivalMode = !isDepartureMode;

    let filedRoute;

    if (isDepartureMode) {
      if (this.Properties.isSatellite) {
        if (this.Properties.filedData.satelliteName) {
          filedRoute = getSatRoute(this.Properties.filedData.satelliteName);
        }
      } else {
        if (this.Properties.filedData.sidName) {
          filedRoute = getSidRoute(
            this.Scene.SCENE_KEY,
            this.Properties.filedData.sidName
          );
        }
      }
    }

    if (isArrivalMode) {
      filedRoute = getStarRoute(
        this.Scene.SCENE_KEY,
        this.Properties.arrivalData.arrBedpost,
        this.Properties.arrivalData.arrPosition
      );
    }

    if (!filedRoute) {
      throw new Error('Could not find a filed route.');
    }

    return filedRoute;
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
    return;
  }

  private togglePTL() {
    this.PTL.setVisible(this.SHOW_PTL);
  }

  private updateOnBaseTurn() {
    // console.log('on base:', this.ARR_ON_BASE_TURN);
    if (this.ARR_ON_BASE_TURN) return;

    const arrRunway = this.Properties.arrivalData.arrRunway;
    const arrPosition = this.Properties.arrivalData.arrPosition;
    const baseTurnHeading = IaToolHeadings[arrRunway][arrPosition].base;
    const downwindHeading = IaToolHeadings[arrRunway][arrPosition].downwind;

    if (this.ARR_HAS_INTERCEPTED_LOC) {
      this.ARR_ON_BASE_TURN = true;
    } else if (
      (this.Scene.SCENE_KEY === RadarSceneKeys.RADAR_24s ||
        this.Scene.SCENE_KEY === RadarSceneKeys.RADAR_15s) &&
      arrPosition === ArrivalPosition.SOUTH
    ) {
      if (
        this.IN_ARR_BOX &&
        this.Commands.heading.current <= 60 - 20 &&
        this.Commands.heading.current >= 1
      ) {
        this.ARR_ON_BASE_TURN = true;
      } else if (
        this.IN_ARR_BOX &&
        this.Commands.heading.current <= 360 &&
        this.Commands.heading.current >= 330
      ) {
        this.ARR_ON_BASE_TURN = true;
      }
    } else if (
      this.IN_ARR_BOX &&
      this.Commands.heading.current <=
        Math.max(downwindHeading - 20, baseTurnHeading) &&
      this.Commands.heading.current >=
        Math.min(downwindHeading + 20, baseTurnHeading)
    ) {
      this.ARR_ON_BASE_TURN = true;
    }

    if (this.ARR_ON_BASE_TURN) {
      this.scene.events.emit(PhaserCustomEvents.PLANE_ON_BASE_TURN, this);
    }
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

  private updateDistanceFromRunwayThreshold() {
    const planePosition = this.getPosition();
    const runwayThreshold = new RunwayOrigins(this.Scene).getOrigin(
      this.Properties.arrivalData.arrRunway
    );

    const distanceInPixels = Phaser.Math.Distance.BetweenPoints(
      planePosition,
      runwayThreshold
    );
    const distanceInMiles = convertPixelsToMiles(distanceInPixels);

    // console.log(distanceInMiles);

    this.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES = distanceInMiles;
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
    const isDepartureMode =
      this.Scene.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE;

    if (!acPerf) {
      throw new Error(
        `Could not find PlanePerformance data for Plane: ${this.name}`
      );
    }

    if (isDepartureMode) {
      const runwayHeading = getRunwayHeading(
        acProps.takeoffData.depRunway
      ).initial;

      const initialCommandsDeparture: PlaneCommands = {
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

      return initialCommandsDeparture;
    }

    const initialCommandsArrival: PlaneCommands = {
      speed: {
        current: acProps.arrivalData.assignedSpeed,
        assigned: acProps.arrivalData.assignedSpeed,
      },
      altitude: {
        current: acProps.arrivalData.assignedAlt + 2000,
        assigned: acProps.arrivalData.assignedAlt,
      },
      heading: {
        current: 0,
        assigned: 0,
        directTo: acProps.arrivalData.assignedHeading,
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

    return initialCommandsArrival;
  }

  private getPlaneOrigin(acProps: PlaneProperties): Phaser.Math.Vector2 {
    if (acProps.terminalPosition === TerminalPosition.ARRIVAL) {
      if (!acProps.arrivalData.arrBedpost) {
        throw new Error(
          `Could not determine runway origin for: ${acProps.acId}`
        );
      }

      const origin = getBedpostOrigin(
        acProps.arrivalData.arrBedpost,
        this.Scene
      );
      return origin;
    }

    if (!acProps.takeoffData.depRunway) {
      throw new Error(`Could not determine runway origin for: ${acProps.acId}`);
    }

    const rwyOrigins = this.Scene.RunwayOrigins;

    const origin = rwyOrigins.getOrigin(acProps.takeoffData.depRunway);
    return origin;
  }

  public customDestroy() {
    this.DESTROYED = true;

    this.HistoryTrail.DotList.forEach((dot) => dot.setVisible(false));
    this.HistoryTrail.IS_VISIBLE = false;
    this.HistoryTrail.setVisible(false);
    this.setVisible(false);

    this.IaIndicator.removeFromUpdateList().removeFromDisplayList().destroy();
    this.Behaviour.removeFromUpdateList().removeFromDisplayList();

    this.getAll().forEach((obj) =>
      obj.removeFromUpdateList().removeFromDisplayList()
    );
    this.removeFromUpdateList().removeFromDisplayList();
    this.removeInteractive();
  }
}
