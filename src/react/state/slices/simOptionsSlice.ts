import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';

import type { RootState } from '../store';

interface SimOptions {
  radarScene: RadarSceneKeys;
  startingCount: number;
  isSingleOps: boolean;
  newStripInterval: [number, number]; // [min, max] in milliseconds
  intervalBetweenNormalDeps: number; // ms
  intervalBetweenVisualDeps: number; // ms
}

const initialState: SimOptions = {
  radarScene: RadarSceneKeys.RADAR_06s,
  startingCount: 6,
  isSingleOps: false,
  newStripInterval: [10_000, 20_000],
  intervalBetweenNormalDeps: 90_000,
  intervalBetweenVisualDeps: 45_000,
};

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
