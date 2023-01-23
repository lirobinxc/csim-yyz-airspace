import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import PhaserGame from '../../../phaser/PhaserGameConfig';
import RadarScene from '../../../phaser/scenes/RadarScene';
import { ReactCustomEvents } from '../../../phaser/types/CustomEvents';
import {
  OtherSceneKeys,
  RadarSceneKeys,
} from '../../../phaser/types/SceneKeys';
import { SidName } from '../../../phaser/types/SidAndSatelliteTypes';
import { ArrivalPhase } from '../../functions/arrival/arrivalTypes';
import { ArrFDE, genArrFDE } from '../../functions/arrival/genArrFDE';
import { genSatFDE } from '../../functions/departure/genSatFDE';
import { insertIntoArray } from '../../functions/insertIntoArray';
import { genSimOptions } from '../genSimOptions';
import type { RootState } from '../store';
import { SimOptions } from './simOptionsSlice';

// Define the initial state using that type
function genArrList(
  radarScene: RadarSceneKeys,
  count: number,
  isSingleOps: boolean
) {
  const defaultArrSequence: ArrFDE[] = [];

  for (let i = 0; i < count; i++) {
    const newArrFde = genArrFDE(radarScene, isSingleOps);

    // Set 1st plane ACTIVE immediately
    if (i === 0) {
      newArrFde.arrPhase = ArrivalPhase.ACTIVE;
    }

    defaultArrSequence.push(newArrFde);
  }

  return defaultArrSequence;
}

function sendAirborneToPhaser(fde: ArrFDE) {
  const RADAR_SCENE = PhaserGame.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.AIRBORNE, fde);
}

function restartPhaser() {
  const RADAR_SCENE = PhaserGame.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;

  RADAR_SCENE.events.emit(ReactCustomEvents.REFRESH);
}

function genInitialState() {
  const simOptions: SimOptions = genSimOptions();

  return genArrList(
    simOptions.radarScene,
    simOptions.startingCount,
    simOptions.isSingleOps
  );
}

const initialState: ArrFDE[] = genInitialState();

export const arrivalList = createSlice({
  name: 'arrivalList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addArrStrip: (
      state,
      action: PayloadAction<{
        radarScene: RadarSceneKeys;
        isSingleOps: boolean;
      }>
    ) => {
      state.push(
        genArrFDE(action.payload.radarScene, action.payload.isSingleOps)
      );
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteStrip: (state, action: PayloadAction<ArrFDE>) => {
      console.log('Removed', action.payload);
      return state.filter(
        (item) => item.uniqueKey !== action.payload.uniqueKey
      );
    },
    setToActive: (state, action: PayloadAction<ArrFDE | undefined>) => {
      if (!action.payload) return state;

      const arrPhase = ArrivalPhase.ACTIVE;
      const selectedFde = action.payload;

      const newList = state.filter(
        (strip) => strip.uniqueKey !== selectedFde.uniqueKey
      );

      sendAirborneToPhaser(selectedFde);

      return [...newList, { ...selectedFde, arrPhase }];
    },
    insertStripBelow: (
      state,
      action: PayloadAction<{ firstStrip: ArrFDE; secondStrip: ArrFDE }>
    ) => {
      const otherStrips = state.filter(
        (strip) => strip.uniqueKey !== action.payload.firstStrip.uniqueKey
      );

      const secondStripIndex = otherStrips.findIndex(
        (strip) => strip.uniqueKey === action.payload.secondStrip.uniqueKey
      );

      const newStrips = insertIntoArray(
        otherStrips,
        secondStripIndex,
        action.payload.firstStrip
      );

      return newStrips;
    },
    restartSim: (state) => {
      restartPhaser();
    },
  },
});

export const arrivalListActions = arrivalList.actions;
export const arrivalListReducer = arrivalList.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectArrivalList = (state: RootState) => state.arrivalList;
