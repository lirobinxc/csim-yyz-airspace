import _ from 'lodash';
import { MasterGameOptions } from '../../phaser/MasterGameOptions';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { TerminalPosition } from '../../phaser/types/SimTypes';
import { ArrBedpost } from '../functions/arrival/genArrRoute';
import { genRandomWindData } from '../functions/genRandomWindData';
import { SimOptions } from './slices/simOptionsSlice';

export enum LocalStorageKeys {
  SIM_OPTIONS = 'SIM_OPTIONS',
}

export const defaultSimOptions: SimOptions = {
  appVersion: MasterGameOptions.appVersion,
  gameSpeedMultiplier: 1,
  radarScene: RadarSceneKeys.RADAR_06s,
  terminalPosition: TerminalPosition.ARRIVAL,
  startingCount: 4,
  isSingleOps: false,
  allowVdp: true,
  newStripInterval: [10_000, 20_000],
  intervalBetweenNormalDeps: 65_000, // should be 65_000
  intervalBetweenVisualDeps: 32_000,
  intervalBetweenSatelliteDeps: 250_000,
  intervalBetweenNormalArrs: 120_000,
  intervalBetweenStraightInArrs: 180_000,
  isModalOpen: false,
  selectedDepStrip: null,
  selectedArrStrip: null,
  isPaused: false,
  activeArrBedposts: [
    ArrBedpost.BOXUM,
    ArrBedpost.IMEBA,
    ArrBedpost.LINNG,
    ArrBedpost.NUBER,
    ArrBedpost.RAGID,
  ],
  maxActiveArrivals: 15,
  arrInnerPracticeMode: false,
  wakeSpacingConfig: {
    'YYZ Rwy 05': 5,
    'YYZ Rwy 06L': 5,
    'YYZ Rwy 15L': 15,
    'YYZ Rwy 15R': 3,
    'YYZ Rwy 23': 5,
    'YYZ Rwy 24R': 5,
    'YYZ Rwy 33L': 2.5,
    'YYZ Rwy 33R': 10,
  },
  priorityBedpost: undefined,
  windData: genRandomWindData(),
};

const localStorage = window.localStorage;

export function getSimOptions(): SimOptions {
  const storedOptionsStr = localStorage.getItem(LocalStorageKeys.SIM_OPTIONS);
  const storedSimOptions: SimOptions =
    storedOptionsStr && JSON.parse(storedOptionsStr);

  if (
    storedSimOptions &&
    storedSimOptions.appVersion === MasterGameOptions.appVersion
  ) {
    console.log('Retrieved localStorage SimOptions.');

    return { ...storedSimOptions, windData: genRandomWindData() };
  }

  localStorage.setItem(
    LocalStorageKeys.SIM_OPTIONS,
    JSON.stringify(defaultSimOptions)
  );
  return defaultSimOptions;
}
