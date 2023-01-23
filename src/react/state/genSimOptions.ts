import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { TerminalPosition } from '../../phaser/types/SimTypes';
import { SimOptions } from './slices/simOptionsSlice';

export enum LocalStorageKeys {
  SIM_OPTIONS = 'SIM_OPTIONS',
}

export const defaultSimOptions: SimOptions = {
  radarScene: RadarSceneKeys.RADAR_06s,
  terminalPosition: TerminalPosition.DEPARTURE,
  startingCount: 4,
  isSingleOps: true,
  allowVdp: true,
  newStripInterval: [10_000, 20_000],
  intervalBetweenNormalDeps: 65_000, // should be ???
  intervalBetweenVisualDeps: 32_000,
  intervalBetweenSatelliteDeps: 250_000,
  intervalBetweenArrivals: 65_000,
  isModalOpen: false,
  selectedDepStrip: null,
  selectedArrStrip: null,
  isPaused: false,
};

const localStorage = window.localStorage;

export function genSimOptions(): SimOptions {
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
