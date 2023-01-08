import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import PhaserGame from '../../../phaser/PhaserGameConfig';
import RadarScene from '../../../phaser/scenes/RadarScene';
import { ReactCustomEvents } from '../../../phaser/types/CustomEvents';
import {
  OtherSceneKeys,
  RadarSceneKeys,
} from '../../../phaser/types/SceneKeys';
import { DeparturePosition, DepFDE } from '../../functions/genDepFdeData';
import {
  defaultSimOptions,
  genSimOptions,
  LocalStorageKeys,
} from '../genSimOptions';

import type { RootState } from '../store';

export interface SimOptions {
  radarScene: RadarSceneKeys;
  startingCount: number;
  isSingleOps: boolean;
  newStripInterval: [number, number]; // [min, max] in milliseconds
  intervalBetweenNormalDeps: number; // ms
  intervalBetweenVisualDeps: number; // ms
  intervalBetweenSatelliteDeps: number; // ms
  isModalOpen: boolean;
  selectedStrip: DepFDE | null;
  isPaused: boolean;
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

const initialState: SimOptions = genSimOptions();

export const simOptions = createSlice({
  name: 'simOptions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (state) => {
      return { ...state, isModalOpen: true };
    },
    closeModal: (state) => {
      return { ...state, isModalOpen: false };
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
    setSelectedStrip: (state, action: PayloadAction<DepFDE>) => {
      return { ...state, selectedStrip: action.payload };
    },
    removeSelectedStrip: (state) => {
      const newOptions = { ...state, selectedStrip: null };
      console.log('newOptions', newOptions.selectedStrip);

      return newOptions;
    },
    pauseSim: (state) => {
      pausePhaser();
      return { ...state, isPaused: true };
    },
    unpauseSim: (state) => {
      unpausePhaser();
      return { ...state, isPaused: false };
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
