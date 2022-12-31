import PhaserGame from './phaser/PhaserGameConfig';
import RadarScene from './phaser/scenes/RadarScene';

import styles from './App.module.scss';
import { RadarSceneKeys } from './phaser/types/SceneKeys';
import {
  PhaserCustomEvents,
  ReactCustomEvents,
} from './phaser/types/CustomEvents';

import React, { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import Modal from 'react-modal';

import './App.module.scss';
import DepartureFDE from './react/components/DepartureFDE/DepartureFDE';
import { useAppSelector, useAppDispatch } from './react/state/hooks';
import {
  departureListActions,
  selectDepartureList,
} from './react/state/slices/departureListSlice';
import SatelliteFDE from './react/components/SatelliteFDE/SatelliteFDE';
import clsx from 'clsx';
import MenuSection from './react/components/MenuSection';
import StripRow from './react/components/FdeSection';
import FdeSection from './react/components/FdeSection';

const examplePhaserFunction = () => {
  const RADAR_SCENE = PhaserGame.scene.keys[
    RadarSceneKeys.RADAR_06s
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.CLICK_ME, { name: 'WOW' });
};

function App() {
  const dispatch = useAppDispatch();

  const airborneList = useAppSelector(selectDepartureList);

  return (
    <div className={styles.App}>
      <MenuSection appVersion="1.0" />
      <FdeSection strips={airborneList} />
    </div>
  );
}

export default App;
