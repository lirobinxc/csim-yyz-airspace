import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';

import type { RootState } from '../store';

interface ILocalStorage extends Storage {
  simOptions: SimOptions;
}

const localStorage = window.localStorage;

export interface SimOptions {
  radarScene: RadarSceneKeys;
  startingCount: number;
  isSingleOps: boolean;
  newStripInterval: [number, number]; // [min, max] in milliseconds
  intervalBetweenNormalDeps: number; // ms
  intervalBetweenVisualDeps: number; // ms
}

export enum LocalStorageKeys {
  SIM_OPTIONS = 'SIM_OPTIONS',
}

const initialState: SimOptions = genInitalState();

export const defaultSimOptions: SimOptions = {
  radarScene: RadarSceneKeys.RADAR_06s,
  startingCount: 4,
  isSingleOps: true,
  newStripInterval: [10_000, 20_000],
  intervalBetweenNormalDeps: 50_000, // should be ???
  intervalBetweenVisualDeps: 25_000,
};

function genInitalState(): SimOptions {
  const storedOptionsStr = localStorage.getItem(LocalStorageKeys.SIM_OPTIONS);
  const storedSimOptions: SimOptions =
    storedOptionsStr && JSON.parse(storedOptionsStr);

  // Checks if SimOption property exists
  if (storedSimOptions && typeof storedSimOptions.startingCount === 'number') {
    console.log('Retrieved localStorage SimOptions.');

    return storedSimOptions;
  }

  localStorage.setItem(
    LocalStorageKeys.SIM_OPTIONS,
    JSON.stringify(defaultSimOptions)
  );
  return defaultSimOptions;
}

export const simOptions = createSlice({
  name: 'simOptions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const simOptionsActions = simOptions.actions;
export const simOptionsReducer = simOptions.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectSimOptions = (state: RootState) => state.simOptions;
