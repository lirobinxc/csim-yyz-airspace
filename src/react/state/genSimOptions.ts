import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { SimOptions } from './slices/simOptionsSlice';

export enum LocalStorageKeys {
  SIM_OPTIONS = 'SIM_OPTIONS',
}

export const defaultSimOptions: SimOptions = {
  radarScene: RadarSceneKeys.RADAR_06s,
  startingCount: 4,
  isSingleOps: true,
  newStripInterval: [10_000, 20_000],
  intervalBetweenNormalDeps: 50_000, // should be ???
  intervalBetweenVisualDeps: 25_000,
  intervalBetweenSatelliteDeps: 120_000,
  isModalOpen: false,
  selectedStrip: null,
  isPaused: false,
};

const localStorage = window.localStorage;

export function genSimOptions(): SimOptions {
  const storedOptionsStr = localStorage.getItem(LocalStorageKeys.SIM_OPTIONS);
  const storedSimOptions: SimOptions =
    storedOptionsStr && JSON.parse(storedOptionsStr);

  // Checks if SimOption property exists
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
