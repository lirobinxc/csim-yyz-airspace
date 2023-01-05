import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
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
  isModalOpen: boolean;
  selectedStrip: string | null;
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
      return newOptions;
    },
    setSelectedStrip: (state, action: PayloadAction<string | null>) => {
      return { ...state, isStripSelected: action.payload };
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
