import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { TerminalPosition } from '../../phaser/types/SimTypes';
import { ArrBedpost } from '../functions/arrival/genArrRoute';
import { SimOptions } from './slices/simOptionsSlice';

export enum LocalStorageKeys {
  SIM_OPTIONS = 'SIM_OPTIONS',
}

export const defaultSimOptions: SimOptions = {
  gameSpeedMultiplier: 1,
  radarScene: RadarSceneKeys.RADAR_06s,
  terminalPosition: TerminalPosition.ARRIVAL,
  startingCount: 4,
  isSingleOps: true,
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
  maxActiveArrivals: 8,
};

const localStorage = window.localStorage;

export function getSimOptions(): SimOptions {
  const storedOptionsStr = localStorage.getItem(LocalStorageKeys.SIM_OPTIONS);
  const storedSimOptions: SimOptions =
    storedOptionsStr && JSON.parse(storedOptionsStr);

  // Checks if new property exists
  if (storedSimOptions && typeof storedSimOptions.isModalOpen === 'boolean') {
    console.log('Retrieved localStorage SimOptions.');

    return storedSimOptions;
  }

  localStorage.setItem(
    LocalStorageKeys.SIM_OPTIONS,
    JSON.stringify(defaultSimOptions)
  );
  return defaultSimOptions;
}
