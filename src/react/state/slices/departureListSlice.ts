import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { SidName } from '../../../phaser/types/SidTypes';
import { determineIfVdpAllowed } from '../../functions/determineIfVdpAllowed';
import { DepFDE, genDepFdeData } from '../../functions/genDepFdeData';
import { genSatFdeData } from '../../functions/genSatFdeData';
import type { RootState } from '../store';

// Define the initial state using that type
function genDepList(
  radarScene: RadarSceneKeys,
  count: number,
  isSingleOps: boolean
) {
  const defaultDepSequence: DepFDE[] = [];

  for (let i = 0; i < count; i++) {
    const num1to10 = _.random(1, 10);
    // if (num1to10 > 9) {
    //   defaultDepSequence.push(genSatFdeData(rwyId));
    //   continue;
    // }

    // VDP Same Sid logic
    const currDepFde = genDepFdeData(radarScene, isSingleOps);
    const prevDepFde = defaultDepSequence[defaultDepSequence.length - 1];

    if (i === 0) {
      defaultDepSequence.push(currDepFde);
      continue;
    }

    if (determineIfVdpAllowed(radarScene, currDepFde, prevDepFde)) {
      i--;
      continue;
    }

    defaultDepSequence.push(currDepFde);
  }

  return defaultDepSequence;
}

// Randomly adds Dep or Sat strip
function randomStrip(radarScene: RadarSceneKeys, isSingleOps: boolean) {
  // const num1to10 = _.random(1, 10);
  // if (num1to10 > 9) return genSatFdeData(radarScene);

  return genDepFdeData(radarScene, isSingleOps);
}

const initialState = genDepList(RadarSceneKeys.RADAR_06s, 12, false);

export const departureList = createSlice({
  name: 'departureList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addStrip: (
      state,
      action: PayloadAction<{
        radarScene: RadarSceneKeys;
        isSingleOps: boolean;
      }>
    ) => {
      state.push(
        randomStrip(action.payload.radarScene, action.payload.isSingleOps)
      );
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // deleteStrip: (state, action: PayloadAction<string>) => {
    //   console.log('Removed', action.payload);
    //   return state.filter((item) => item.acId !== action.payload);
    // },
    refreshStrips: (
      state,
      action: PayloadAction<{
        runwayId: RadarSceneKeys;
        count: number;
        isSingleOps: boolean;
      }>
    ) => {
      console.log('Refresh strips for', action.payload);
      return genDepList(
        action.payload.runwayId,
        action.payload.count,
        action.payload.isSingleOps
      );
    },
  },
});

export const departureListActions = departureList.actions;
export const departureListReducer = departureList.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectDepartureList = (state: RootState) => state.departureList;
