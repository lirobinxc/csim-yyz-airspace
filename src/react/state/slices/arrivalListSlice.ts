import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import Engine from '../../../engine/EngineConfig';
import RadarScene from '../../../engine/scenes/RadarScene';
import { ReactCustomEvents } from '../../../engine/types/CustomEvents';
import {
  OtherSceneKeys,
  RadarSceneKeys,
} from '../../../engine/types/SceneKeys';
import { SidName } from '../../../engine/types/SidAndSatelliteTypes';
import { ArrivalPhase } from '../../../engine/types/ArrivalTypes';
import { ArrFDE, genArrFDE } from '../../functions/arrival/genArrFDE';
import { ArrBedpost } from '../../functions/arrival/genArrRoute';
import { DepFDE } from '../../functions/departure/genDepFDE';
import { genSatFDE } from '../../functions/departure/genSatFDE';
import { insertIntoArray } from '../../functions/insertIntoArray';
import { getSimOptions } from '../getSimOptions';
import type { RootState } from '../store';
import { SimOptions } from './simOptionsSlice';
import { act } from 'react-dom/test-utils';

// Define the initial state using that type
function genArrList(
  radarScene: RadarSceneKeys,
  maxActiveArrivals: number,
  isSingleOps: boolean,
  activeBedposts: ArrBedpost[],
  innerPracticeMode: boolean,
  allowStraightIn: boolean,
  priorityBedpost: ArrBedpost | undefined
) {
  const defaultArrSequence: ArrFDE[] = [];

  for (let i = 0; i < maxActiveArrivals; i++) {
    let newArrFde = genArrFDE(
      radarScene,
      isSingleOps,
      activeBedposts,
      innerPracticeMode,
      allowStraightIn,
      priorityBedpost
    );

    defaultArrSequence.push(newArrFde);
  }

  return defaultArrSequence;
}

function sendAircraftToPhaser(fde: ArrFDE) {
  const RADAR_SCENE = Engine.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.ACTIVE_ARR, fde);
}

function restartPhaser() {
  const RADAR_SCENE = Engine.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;

  RADAR_SCENE.events.emit(ReactCustomEvents.REFRESH);
}

function genInitialState() {
  const simOptions: SimOptions = getSimOptions();

  return genArrList(
    simOptions.radarScene,
    1,
    simOptions.isSingleOps,
    simOptions.activeArrBedposts,
    simOptions.arrInnerPracticeMode,
    false,
    undefined
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
        activeBedposts: ArrBedpost[];
        innerOnly: boolean;
        allowStraightIn: boolean;
        priorityBedpost: ArrBedpost | undefined;
      }>
    ) => {
      state.push(
        genArrFDE(
          action.payload.radarScene,
          action.payload.isSingleOps,
          action.payload.activeBedposts,
          action.payload.innerOnly,
          action.payload.allowStraightIn,
          action.payload.priorityBedpost
        )
      );
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteStrip: (state, action: PayloadAction<ArrFDE>) => {
      console.log('Removed', action.payload.acId);
      return state.filter(
        (item) => item.uniqueKey !== action.payload.uniqueKey
      );
    },
    setToPreActive: (state, action: PayloadAction<ArrFDE | undefined>) => {
      if (!action.payload) return state;

      const arrPhase = ArrivalPhase.PRE_ACTIVE;
      const selectedFde = action.payload;

      const newList = state.filter(
        (strip) => strip.uniqueKey !== selectedFde.uniqueKey
      );

      sendAircraftToPhaser(selectedFde);

      return [
        ...newList,
        { ...selectedFde, arrPhase, arrivalTime: Date.now() },
      ];
    },
    setToActive: (state, action: PayloadAction<ArrFDE | undefined>) => {
      if (!action.payload) return state;

      const arrPhase = ArrivalPhase.ACTIVE;
      const selectedFde = action.payload;

      const newList = state.filter(
        (strip) => strip.uniqueKey !== selectedFde.uniqueKey
      );

      return [
        ...newList,
        { ...selectedFde, arrPhase, arrivalTime: Date.now() },
      ];
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
