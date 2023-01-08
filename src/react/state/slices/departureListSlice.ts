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
import { determineIfVdpAllowed } from '../../functions/determineIfVdpAllowed';
import {
  DeparturePhase,
  DeparturePosition,
  DepFDE,
  genDepFdeData,
} from '../../functions/genDepFdeData';
import { genSatFdeData } from '../../functions/genSatFdeData';
import { insertIntoArray } from '../../functions/insertIntoArray';
import { genSimOptions } from '../genSimOptions';
import { useAppDispatch } from '../hooks';
import type { RootState } from '../store';
import { SimOptions, simOptionsActions } from './simOptionsSlice';

// Define the initial state using that type
function genDepList(
  radarScene: RadarSceneKeys,
  count: number,
  isSingleOps: boolean
) {
  const defaultDepSequence: DepFDE[] = [];

  for (let i = 0; i < count; i++) {
    const num1to10 = _.random(1, 10);
    // should be 9
    if (num1to10 > 9) {
      defaultDepSequence.push(genSatFdeData(radarScene));
      continue;
    }

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

function sendAirborneToPhaser(fde: DepFDE) {
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

  return genDepList(
    simOptions.radarScene,
    simOptions.startingCount,
    simOptions.isSingleOps
  );
}

const initialState: DepFDE[] = genInitialState();

export const departureList = createSlice({
  name: 'departureList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addDepStrip: (
      state,
      action: PayloadAction<{
        radarScene: RadarSceneKeys;
        isSingleOps: boolean;
        prevFdeSidName: SidName | undefined;
      }>
    ) => {
      state.push(
        genDepFdeData(
          action.payload.radarScene,
          action.payload.isSingleOps,
          action.payload.prevFdeSidName
        )
      );
    },
    addSatStrip: (state, action: PayloadAction<RadarSceneKeys>) => {
      state.push(genSatFdeData(action.payload));
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteStrip: (state, action: PayloadAction<string>) => {
      console.log('Removed', action.payload);
      return state.filter((item) => item.acId.code !== action.payload);
    },
    setToInPosition: (state, action: PayloadAction<DepFDE | undefined>) => {
      if (!action.payload) return state;

      const depPhase = DeparturePhase.IN_POSITION;
      const selectedFde = action.payload;

      const newList: DepFDE[] = state.filter(
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
        (strip) => strip.uniqueKey !== selectedFde.uniqueKey
      );

      sendAirborneToPhaser(selectedFde);

      return [...newList, { ...selectedFde, depPhase }];
    },
    setStripAsVdp: (state, action: PayloadAction<DepFDE | undefined>) => {
      if (!action.payload) return state;

      const selectedFde = action.payload;

      const selectedFdeIdx = state.findIndex(
        (strip) => strip.uniqueKey !== selectedFde.uniqueKey
      );

      let newList: DepFDE[] = [...state];
      if (selectedFdeIdx > -1) {
        newList[selectedFdeIdx].isVDP = true;
      }
      return newList;
    },
    setStripDepPosition: (
      state,
      action: PayloadAction<{
        uniqueKey: string;
        depPosition: DeparturePosition;
      }>
    ) => {
      const selectedStrip = state.find(
        (strip) => strip.uniqueKey === action.payload.uniqueKey
      );

      const otherStrips = state.filter(
        (strip) => strip.uniqueKey !== action.payload.uniqueKey
      );

      if (selectedStrip) {
        const newStrip: DepFDE = {
          ...selectedStrip,
          depPosition: action.payload.depPosition,
        };

        return [...otherStrips, newStrip];
      }

      return state;
    },
    insertStripBelow: (
      state,
      action: PayloadAction<{ firstStrip: DepFDE; secondStrip: DepFDE }>
    ) => {
      const firstStrip: DepFDE = {
        ...action.payload.firstStrip,
        depPosition: action.payload.secondStrip.depPosition,
      };

      const otherStrips = state.filter(
        (strip) => strip.uniqueKey !== action.payload.firstStrip.uniqueKey
      );

      const secondStripIndex = otherStrips.findIndex(
        (strip) => strip.uniqueKey === action.payload.secondStrip.uniqueKey
      );

      const newStrips = insertIntoArray(
        otherStrips,
        secondStripIndex,
        firstStrip
      );

      return newStrips;
    },
    restartSim: (state) => {
      restartPhaser();
    },
  },
});

export const departureListActions = departureList.actions;
export const departureListReducer = departureList.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectDepartureList = (state: RootState) => state.departureList;
