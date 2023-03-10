import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MasterGameOptions } from '../../../phaser/MasterGameOptions';
import PhaserGame from '../../../phaser/PhaserGameConfig';
import RadarScene from '../../../phaser/scenes/RadarScene';
import { DepRunwayYYZ } from '../../../phaser/types/AirportTypes';
import { ReactCustomEvents } from '../../../phaser/types/CustomEvents';
import {
  OtherSceneKeys,
  RadarSceneKeys,
} from '../../../phaser/types/SceneKeys';
import { TerminalPosition } from '../../../phaser/types/SimTypes';
import { ArrFDE } from '../../functions/arrival/genArrFDE';
import { ArrBedpost } from '../../functions/arrival/genArrRoute';
import { DepFDE } from '../../functions/departure/genDepFDE';
import {
  defaultSimOptions,
  getSimOptions,
  LocalStorageKeys,
} from '../getSimOptions';

import type { RootState } from '../store';

export interface SimOptions {
  appVersion: string;
  gameSpeedMultiplier: number;
  radarScene: RadarSceneKeys;
  terminalPosition: TerminalPosition;
  startingCount: number;
  isSingleOps: boolean;
  allowVdp: boolean;
  newStripInterval: [number, number]; // [min, max] in milliseconds
  intervalBetweenNormalDeps: number; // ms
  intervalBetweenVisualDeps: number; // ms
  intervalBetweenSatelliteDeps: number; // ms
  intervalBetweenNormalArrs: number; // ms
  intervalBetweenStraightInArrs: number; // ms
  isModalOpen: boolean;
  selectedDepStrip: DepFDE | null;
  selectedArrStrip: ArrFDE | null;
  isPaused: boolean;
  activeArrBedposts: ArrBedpost[];
  maxActiveArrivals: number;
  arrInnerPracticeMode: boolean;
  wakeSpacingConfig: { [key in DepRunwayYYZ]: number };
  priorityBedpost: ArrBedpost | undefined;
  windData: {
    [key in RadarSceneKeys]: {
      speed: number; // knots
      direction: number; // compass
    };
  };
}

function pausePhaser() {
  const RADAR_SCENE = PhaserGame.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.PAUSE);
}

function unpausePhaser() {
  const RADAR_SCENE = PhaserGame.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.UNPAUSE);
}

const initialState: SimOptions = getSimOptions();

export const simOptions = createSlice({
  name: 'simOptions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (state) => {
      const newOptions: SimOptions = { ...state, isModalOpen: true };
      return newOptions;
    },
    closeModal: (state) => {
      const newOptions: SimOptions = { ...state, isModalOpen: false };
      return newOptions;
    },
    applyOptions: (state, action: PayloadAction<SimOptions>) => {
      const newOptions: SimOptions = { ...state, ...action.payload };
      localStorage.setItem(
        LocalStorageKeys.SIM_OPTIONS,
        JSON.stringify(newOptions)
      );
      console.log({ newOptions });

      return newOptions;
    },
    setSelectedDepStrip: (state, action: PayloadAction<DepFDE>) => {
      const newOptions: SimOptions = {
        ...state,
        selectedDepStrip: action.payload,
      };
      return newOptions;
    },
    removeSelectedDepStrip: (state) => {
      const newOptions: SimOptions = { ...state, selectedDepStrip: null };
      return newOptions;
    },
    setSelectedArrStrip: (state, action: PayloadAction<ArrFDE>) => {
      const newOptions: SimOptions = {
        ...state,
        selectedArrStrip: action.payload,
      };
      return newOptions;
    },
    removeSelectedArrStrip: (state) => {
      const newOptions: SimOptions = { ...state, selectedArrStrip: null };
      return newOptions;
    },
    enableVdp: (state) => {
      const newOptions: SimOptions = { ...state, allowVdp: true };
      return newOptions;
    },
    disableVdp: (state) => {
      const newOptions: SimOptions = { ...state, allowVdp: false };
      return newOptions;
    },
    pauseSim: (state) => {
      pausePhaser();
      const newOptions: SimOptions = { ...state, isPaused: true };
      return newOptions;
    },
    unpauseSim: (state) => {
      unpausePhaser();
      const newOptions: SimOptions = { ...state, isPaused: false };
      return newOptions;
    },
    cycleGameSpeed: (state) => {
      const multipliers = MasterGameOptions.speedMultipliers;

      const currIdx = multipliers.findIndex(
        (item) => item === state.gameSpeedMultiplier
      );

      let newMultiplier: number;

      if (multipliers.length === currIdx + 1) {
        newMultiplier = multipliers[0];
      } else {
        newMultiplier = multipliers[currIdx + 1];
      }

      const RADAR_SCENE = PhaserGame.scene.keys[
        OtherSceneKeys.RADAR_BASE
      ] as RadarScene;
      RADAR_SCENE.events.emit(
        ReactCustomEvents.GAME_SPEED_MULTIPLER_CHANGE,
        newMultiplier
      );

      const newOptions: SimOptions = {
        ...state,
        gameSpeedMultiplier: newMultiplier,
      };
      return newOptions;
    },
    resetLocalStorageToDefaults: () => {
      console.log('resetLocalStorage');

      localStorage.setItem(
        LocalStorageKeys.SIM_OPTIONS,
        JSON.stringify(defaultSimOptions)
      );
      return defaultSimOptions;
    },
  },
});

export const simOptionsActions = simOptions.actions;
export const simOptionsReducer = simOptions.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectSimOptions = (state: RootState) => state.simOptions;
