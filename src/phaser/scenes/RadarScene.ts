import Phaser from 'phaser';

import RadarBg from '../objects/RadarBg';
import Waypoint from '../objects/Waypoint';
import { OtherSceneKeys, RadarSceneKeys } from '../types/SceneKeys';
import { AssetKeys } from '../types/AssetKeys';
import PointerCoordinateLogger from '../objects/PointerCoordinates';
import RunwayOrigins from '../config/RunwayOrigins';
import Plane from '../objects/Plane/Plane';
import { DomEvents } from '../types/DomEvents';

import img_Radar06sDep from '../assets/Radar06sDep.png';
import img_Radar24sDep from '../assets/Radar24sDep.png';
import img_Radar33sDep from '../assets/Radar33sDep.png';
import img_Radar15sDep from '../assets/Radar15sDep.png';
import img_Radar06sArr from '../assets/Radar06sArr.png';
import img_Radar24sArr from '../assets/Radar24sArr.png';
import img_Radar33sArr from '../assets/Radar33sArr.png';
import img_Radar15sArr from '../assets/Radar15sArr.png';

import img_PpsSymbol from '../assets/PpsSymbol.png';
import fontTexture_DejaVuMonoBold from '../assets/font/FontDejaVuMonoBold.png';
import fontXml_DejaVuMonoBold from '../assets/font/FontDejaVuMonoBold.xml';
import DebugButton from '../objects/DebugButton';
import { PhaserCustomEvents, ReactCustomEvents } from '../types/CustomEvents';
import { DepFDE } from '../../react/functions/departure/genDepFDE';
import { genPlanePropsFromDepFDE } from '../utils/genPlanePropsFromDepFDE';
import SpeechSynth from '../objects/SpeechSynth';
import FiledRouteLine from '../objects/FiledRouteLine';
import {
  defaultSimOptions,
  getSimOptions,
  LocalStorageKeys,
} from '../../react/state/genSimOptions';
import { SimOptions } from '../../react/state/slices/simOptionsSlice';
import { WP_LIST_DEP_06s } from '../config/WaypointConfigDep/WaypointConfigDep06s';
import { WP_LIST_DEP_24s } from '../config/WaypointConfigDep/WaypointConfigDep24s';
import { WP_LIST_DEP_33s } from '../config/WaypointConfigDep/WaypointConfigDep33s';
import { WP_LIST_DEP_15s } from '../config/WaypointConfigDep/WaypointConfigDep15s';
import { TerminalPosition } from '../types/SimTypes';
import { WP_LIST_ARR_06s } from '../config/WaypointConfigArr/WaypointConfigArr06s';
import { MasterGameConfig } from '../config/GameConfig';
import { ArrFDE } from '../../react/functions/arrival/genArrFDE';
import { genPlanePropsFromArrFDE } from '../utils/genPlanePropsFromArrFDE';
import { ColorKeys } from '../types/ColorKeys';
import { RunwayLocalizers } from '../config/RunwayLocalizers';
import CursorHalo from '../objects/CursorHalo';

export default class RadarScene extends Phaser.Scene {
  public Waypoints: Waypoint[];
  public PlaneList: Plane[];
  public Localizers: RunwayLocalizers | null;
  public RunwayOrigins!: RunwayOrigins;
  public Speech: SpeechSynth;
  private SpeechQueue: { text: string; plane: Plane; isCheckIn: boolean }[];
  private FiledRouteLine: FiledRouteLine | null;

  public SIM_OPTIONS: SimOptions;
  public IS_DEBUG_MODE: boolean;

  public SELECTED_PLANE: Plane | null;
  public CURRENTLY_SPEAKING_PLANE: Plane | null;

  // Template props
  public SCENE_KEY: RadarSceneKeys;
  private ASSET_KEY: AssetKeys;

  // Subcomponents
  private RadarBg!: RadarBg;

  constructor(sceneKey: RadarSceneKeys) {
    super(OtherSceneKeys.RADAR_BASE);

    this.Waypoints = [];
    this.PlaneList = [];
    this.Localizers = null;
    this.Speech = new SpeechSynth();
    this.SpeechQueue = [];
    this.FiledRouteLine = null;

    this.IS_DEBUG_MODE = MasterGameConfig.isDebug;
    this.SIM_OPTIONS = getSimOptions();

    // Init: Template props
    this.SCENE_KEY = this.SIM_OPTIONS.radarScene;
    this.ASSET_KEY = AssetKeys.RADAR_06s_DEP_BG; // fallback value

    // Init: Constants
    this.SELECTED_PLANE = null;
    this.CURRENTLY_SPEAKING_PLANE = null;
  }

  init() {
    // this.SIM_OPTIONS = getSimOptions();
    // this.SCENE_KEY = this.SIM_OPTIONS.radarScene;
  }

  preload() {
    // Create: Radar background
    switch (this.SCENE_KEY) {
      case RadarSceneKeys.RADAR_06s:
        if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE) {
          this.load.image(AssetKeys.RADAR_06s_DEP_BG, img_Radar06sDep);
          this.ASSET_KEY = AssetKeys.RADAR_06s_DEP_BG;
        } else {
          this.load.image(AssetKeys.RADAR_06s_ARR_BG, img_Radar06sArr);
          this.ASSET_KEY = AssetKeys.RADAR_06s_ARR_BG;
        }
        break;
      case RadarSceneKeys.RADAR_24s:
        if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE) {
          this.load.image(AssetKeys.RADAR_24s_DEP_BG, img_Radar24sDep);
          this.ASSET_KEY = AssetKeys.RADAR_24s_DEP_BG;
        } else {
          this.load.image(AssetKeys.RADAR_24s_ARR_BG, img_Radar24sArr);
          this.ASSET_KEY = AssetKeys.RADAR_24s_ARR_BG;
        }
        break;
      case RadarSceneKeys.RADAR_33s:
        if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE) {
          this.load.image(AssetKeys.RADAR_33s_DEP_BG, img_Radar33sDep);
          this.ASSET_KEY = AssetKeys.RADAR_33s_DEP_BG;
        } else {
          this.load.image(AssetKeys.RADAR_33s_ARR_BG, img_Radar33sArr);
          this.ASSET_KEY = AssetKeys.RADAR_33s_ARR_BG;
        }
        break;
      case RadarSceneKeys.RADAR_15s:
        if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE) {
          this.load.image(AssetKeys.RADAR_15s_DEP_BG, img_Radar15sDep);
          this.ASSET_KEY = AssetKeys.RADAR_15s_DEP_BG;
        } else {
          this.load.image(AssetKeys.RADAR_15s_ARR_BG, img_Radar15sArr);
          this.ASSET_KEY = AssetKeys.RADAR_15s_ARR_BG;
        }
        break;
      default:
        throw new Error(
          `There is a problem with the SCENE_KEY provided for the RadarScene: ${this.SCENE_KEY}`
        );
    }
    this.load.image(AssetKeys.PPS_SYMBOL, img_PpsSymbol);
    this.load.bitmapFont(
      AssetKeys.FONT_DEJAVU_MONO_BOLD,
      [fontTexture_DejaVuMonoBold],
      fontXml_DejaVuMonoBold
    );
  }

  create() {
    // Create: Background Image
    this.RadarBg = new RadarBg(this, this.ASSET_KEY);
    this.RadarBg.setInteractive();

    // Create: Waypoints Layer
    if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.DEPARTURE) {
      switch (this.SCENE_KEY) {
        case RadarSceneKeys.RADAR_06s:
          WP_LIST_DEP_06s.forEach((waypointData) => {
            this.Waypoints.push(new Waypoint(this, waypointData));
          });
          break;
        case RadarSceneKeys.RADAR_24s:
          WP_LIST_DEP_24s.forEach((waypointData) => {
            this.Waypoints.push(new Waypoint(this, waypointData));
          });
          break;
        case RadarSceneKeys.RADAR_33s:
          WP_LIST_DEP_33s.forEach((waypointData) => {
            this.Waypoints.push(new Waypoint(this, waypointData));
          });
          break;
        case RadarSceneKeys.RADAR_15s:
          WP_LIST_DEP_15s.forEach((waypointData) => {
            this.Waypoints.push(new Waypoint(this, waypointData));
          });
          break;
        default:
          throw new Error(
            `There is a problem with the SCENE_KEY provided for the RadarScene: ${this.SCENE_KEY}`
          );
      }
    }
    if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL) {
      switch (this.SCENE_KEY) {
        case RadarSceneKeys.RADAR_06s:
          WP_LIST_ARR_06s.forEach((waypointData) => {
            this.Waypoints.push(new Waypoint(this, waypointData));
          });
          break;
        default:
          throw new Error(
            `There is a problem with the SCENE_KEY provided for the RadarScene: ${this.SCENE_KEY}`
          );
      }
    }

    // Create: RunwayOrigins
    this.RunwayOrigins = new RunwayOrigins(this);

    // Create: Buttons
    new DebugButton(this);

    // Create: Developer components
    new PointerCoordinateLogger(this);

    // TEMP Create: Runway FINAL line for intercepts
    // TEMP: Cursor Halo
    if (this.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL) {
      new CursorHalo(this);

      this.Localizers = new RunwayLocalizers(this);
      // const line = finalLine.geom as Phaser.Geom.Line;
      // const point = new Phaser.Geom.Point(0, 0);
      // point.setTo();
      // Phaser.Geom.Intersects.PointToLine(point, line);
    }

    // this.cameras.main.setZoom(1.4);
    // this.cameras.main.centerOn(400.2217190139294, 600.6260415366768);

    // On CustomPhaserEvent: PLANE_SELECTED
    this.events.on(PhaserCustomEvents.PLANE_SELECTED, (plane: Plane) => {
      if (plane instanceof Plane) {
        if (this.SELECTED_PLANE) {
          this.SELECTED_PLANE.IS_SELECTED = false;
          this.SELECTED_PLANE.setDepth(10);
          this.SELECTED_PLANE = null;
        }
        this.SELECTED_PLANE = plane;
        plane.IS_SELECTED = true;
        plane.setDepth(999);
      } else {
        throw new Error(
          `A Plane object was not passed to the PLANE_SELECTED event emitter. Argument "${plane}" is of type ${typeof plane}`
        );
      }
    });

    // On CustomPhaserEvent: PILOT_SPEECH
    this.events.on(
      PhaserCustomEvents.PILOT_SPEECH,
      (speechData: { text: string; plane: Plane; isCheckIn: boolean }) => {
        const isTextString = typeof speechData.text === 'string';
        const isPlane = speechData.plane instanceof Plane;
        if (isTextString && isPlane) {
          this.SpeechQueue.push(speechData);
        } else {
          throw new Error(
            `Incorrect PILOT_SPEECH data was emitted: ${
              (speechData.text, speechData.plane)
            }`
          );
        }
      }
    );

    // On CustomPhaserEvent: ACID_CLICKED
    this.events.on(
      PhaserCustomEvents.ACID_CLICKED,
      ({ plane, pointer }: { plane: Plane; pointer: Phaser.Input.Pointer }) => {
        if (pointer.rightButtonDown()) {
          return;
        }
        if (pointer.middleButtonDown()) return;

        if (this.FiledRouteLine) {
          this.FiledRouteLine.customDestroy();
        }

        if (
          this.SIM_OPTIONS.terminalPosition === TerminalPosition.ARRIVAL &&
          plane.ARR_HANDOFF_IN_PROGRESS
        ) {
          this.events.emit(
            PhaserCustomEvents.ACCEPT_HANDOFF_BUTTON_CLICKED,
            plane
          );
          return;
        }

        this.FiledRouteLine = new FiledRouteLine(plane);
      }
    );

    // On Input: Clicked RadarBg
    this.RadarBg.on(DomEvents.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) {
        this.events.emit(PhaserCustomEvents.RIGHT_CLICKED_RADAR_BG);

        if (this.FiledRouteLine) {
          this.FiledRouteLine.customDestroy();
          this.FiledRouteLine = null;
        }

        if (this.SELECTED_PLANE instanceof Plane) {
          this.SELECTED_PLANE.IS_SELECTED = false;
          this.SELECTED_PLANE.setDepth(10);
        }
        this.SELECTED_PLANE = null;
      }

      if (this.SELECTED_PLANE instanceof Plane) {
        if (!this.SELECTED_PLANE.CommandMenu.SELECTED_BUTTON) {
          this.SELECTED_PLANE.IS_SELECTED = false;
          this.SELECTED_PLANE = null;
        }
      }
    });

    // On React Event: Departure Mode - AIRBORNE
    this.events.on(ReactCustomEvents.AIRBORNE_DEP, (fde: DepFDE) => {
      const planeProps = genPlanePropsFromDepFDE(fde);

      const airbornePlane = new Plane(this, planeProps);
      this.PlaneList.push(airbornePlane);
    });
    // On React Event: Arrival Mode - ACTIVE
    this.events.on(ReactCustomEvents.ACTIVE_ARR, (fde: ArrFDE) => {
      const planeProps = genPlanePropsFromArrFDE(fde);

      const airbornePlane = new Plane(this, planeProps);
      this.PlaneList.push(airbornePlane);
    });

    // On React Event: REFRESH
    this.events.on(ReactCustomEvents.REFRESH, () => {
      window.location.reload();
    });

    // On React Event: PAUSE
    this.events.on(ReactCustomEvents.PAUSE, () => {
      this.scene.pause();
    });
    // On React Event: UNPAUSE
    this.events.on(ReactCustomEvents.UNPAUSE, () => {
      this.scene.resume();
    });
  }

  update() {
    this.handleSpeechQueue();
    this.toggleDebug();
  }

  private resetRadar(radarScene: RadarSceneKeys) {
    this.Waypoints.forEach((wp) => wp.destroy());
    this.PlaneList.forEach((plane) => {
      plane.destroy(true);
    });

    this.SCENE_KEY = radarScene;
    this.ASSET_KEY = AssetKeys.RADAR_06s_DEP_BG; // fallback value

    this.SELECTED_PLANE = null;
    this.CURRENTLY_SPEAKING_PLANE = null;
    this.scene.restart({ radarScene });
  }

  private handleSpeechQueue() {
    if (this.Speech.IS_TALKING) return;

    if (this.SpeechQueue.length === 0) {
      this.CURRENTLY_SPEAKING_PLANE = null;
      return;
    }

    const currSpeechData = this.SpeechQueue.shift();
    if (currSpeechData === undefined) return;

    this.CURRENTLY_SPEAKING_PLANE = currSpeechData.plane;

    // On Check-ins only
    if (currSpeechData.isCheckIn) {
      this.Speech.speak(currSpeechData.text, currSpeechData.plane);
      return;
    }

    // Create combined sentence
    const combinedSentence = [];
    combinedSentence.push(currSpeechData.text);

    while (
      this.SpeechQueue[0] &&
      currSpeechData.plane.name === this.SpeechQueue[0].plane.name
    ) {
      const nextSpeechData = this.SpeechQueue.shift();
      combinedSentence.push(nextSpeechData?.text);
      continue;
    }

    combinedSentence.push(currSpeechData.plane.Properties.acId.spoken);

    const finalSpokenSentence = combinedSentence.join(' ');

    this.Speech.speak(finalSpokenSentence, currSpeechData.plane);
  }

  elevateWaypointsIfDirectToCommandIsSelected() {
    if (this.SELECTED_PLANE) {
      if (this.SELECTED_PLANE.IS_PENDING_DIRECT_TO_COMMAND) {
        this.Waypoints.forEach((wp) => {
          wp.setDepth(1000000);
        });
      }
      return;
    } else {
      this.Waypoints.forEach((wp) => {
        wp.setDepth(1);
      });
    }
  }

  private toggleDebug() {
    this.RunwayOrigins.showDots(this.IS_DEBUG_MODE);

    if (this.Localizers) {
      this.Localizers.showLines(this.IS_DEBUG_MODE);
    }
  }
}
