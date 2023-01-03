import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import PhaserGame from '../../../phaser/PhaserGameConfig';
import RadarScene from '../../../phaser/scenes/RadarScene';
import { ReactCustomEvents } from '../../../phaser/types/CustomEvents';
import {
  OtherSceneKeys,
  RadarSceneKeys,
} from '../../../phaser/types/SceneKeys';
import { SidName } from '../../../phaser/types/SidTypes';
import { determineIfVdpAllowed } from '../../functions/determineIfVdpAllowed';
import {
  DeparturePhase,
  DeparturePosition,
  DepFDE,
  genDepFdeData,
} from '../../functions/genDepFdeData';
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

    let prevDepFde = defaultDepSequence[defaultDepSequence.length - 1];

    const currDepFde = genDepFdeData(
      radarScene,
      isSingleOps,
      prevDepFde?.sidName
    );

    // Set 1st plane IN_POSITION immediately
    if (i === 0) {
      currDepFde.depPhase = DeparturePhase.IN_POSITION;
    }

    defaultDepSequence.push(currDepFde);
  }

  return defaultDepSequence;
}

// Randomly adds Dep or Sat strip
function addRandomStrip(
  radarScene: RadarSceneKeys,
  isSingleOps: boolean,
  prevFdeSidName: SidName | undefined
) {
  // const num1to10 = _.random(1, 10);
  // if (num1to10 > 9) return genSatFdeData(radarScene);

  return genDepFdeData(radarScene, isSingleOps, prevFdeSidName);
}

function sendAirborneToPhaser(fde: DepFDE) {
  const RADAR_SCENE = PhaserGame.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.AIRBORNE, fde);
}

function restartPhaser(radarScene: RadarSceneKeys) {
  const RADAR_SCENE = PhaserGame.scene.keys[
    OtherSceneKeys.RADAR_BASE
  ] as RadarScene;

  RADAR_SCENE.events.emit(ReactCustomEvents.REFRESH, radarScene);
}

const initialState = genDepList(RadarSceneKeys.RADAR_06s, 3, true);

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
        prevFdeSidName: SidName | undefined;
      }>
    ) => {
      state.push(
        addRandomStrip(
          action.payload.radarScene,
          action.payload.isSingleOps,
          action.payload.prevFdeSidName
        )
      );
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // deleteStrip: (state, action: PayloadAction<string>) => {
    //   console.log('Removed', action.payload);
    //   return state.filter((item) => item.acId !== action.payload);
    // },
    setToInPosition: (state, action: PayloadAction<DepFDE | undefined>) => {
      if (!action.payload) return state;

      const depPhase = DeparturePhase.IN_POSITION;
      const selectedFde = action.payload;

      const newList = state.filter(
        (strip) => strip.acId.code !== selectedFde.acId.code
      );

      return [
        ...newList,
        { ...selectedFde, depPhase, inPositionTime: Date.now() },
      ];
    },
    setToAirborne: (state, action: PayloadAction<DepFDE | undefined>) => {
      if (!action.payload) return state;

      const depPhase = DeparturePhase.AIRBORNE;
      const selectedFde = action.payload;

      const newList = state.filter(
        (strip) => strip.acId.code !== selectedFde.acId.code
      );

      sendAirborneToPhaser(selectedFde);

      return [...newList, { ...selectedFde, depPhase }];
    },
    refreshStrips: (
      state,
      action: PayloadAction<{
        radarScene: RadarSceneKeys;
        count: number;
        isSingleOps: boolean;
      }>
    ) => {
      // console.log('Refresh strips for', action.payload);
      restartPhaser(action.payload.radarScene);

      return genDepList(
        action.payload.radarScene,
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
