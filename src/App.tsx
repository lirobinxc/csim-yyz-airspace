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
import { RunwayId } from './react/data/sidsCollection';
import { useAppSelector, useAppDispatch } from './react/state/hooks';
import {
  airborneListActions,
  selectAirborneList,
} from './react/state/slices/airborneSlice';
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

interface ILocalStorage extends Storage {
  runwayId?: RunwayId;
  totalItems?: number;
  timedAdd?: number;
  onlySatellites?: boolean;
}

const localStorage: ILocalStorage = window.localStorage;

// const localStorageRunwayId =
//   (localStorage.getItem('runwayId') as RunwayId) || RunwayId['05, 06LR'];
// console.log(localStorageRunwayId);

function App() {
  const dispatch = useAppDispatch();

  const airborneList = useAppSelector(selectAirborneList);

  const [options, setOptions] = useState({
    count: Number(localStorage.getItem('count')) || 6,
    timedAdd: Number(localStorage.getItem('timedAdd')) || 6,
    runwayId:
      (localStorage.getItem('runwayId') as RunwayId) || RunwayId['05, 06LR'],
    onlySatellites:
      localStorage.getItem('onlySatellites')?.toLocaleLowerCase() === 'true' ||
      false,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [timedAddEnabled, setTimedAddEnabled] = useState(false);

  useEffect(() => {
    dispatch(
      airborneListActions.refreshStrips({
        runwayId: options.runwayId,
        count: options.count,
        onlySatellites: options.onlySatellites,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.count, options.runwayId]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function refreshSeq() {
    dispatch(
      airborneListActions.refreshStrips({
        runwayId: options.runwayId,
        count: options.count,
        onlySatellites: options.onlySatellites,
      })
    );
  }

  function setCount(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = 6;
    if (value > 99) value = 99;
    if (value < 1) value = 1;

    localStorage.setItem('count', value.toString());
    setOptions({ ...options, count: value });
  }

  function setTimedAdd(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (value < 1 || isNaN(value)) value = 6;

    localStorage.setItem('timedAdd', value.toString());
    setOptions({ ...options, timedAdd: value });
  }

  function setRunwayId(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = target.value as RunwayId;

    localStorage.setItem('runwayId', value);
    setOptions({ ...options, runwayId: value });
  }

  useEffect(() => {
    localStorage.setItem(
      'onlySatellites',
      options.onlySatellites ? 'true' : 'false'
    );
  }, [options.onlySatellites]);

  useInterval(() => {
    if (!timedAddEnabled) return;
    console.log('ADDED NEW STRIP');

    dispatch(
      airborneListActions.addStrip({
        rwyId: options.runwayId,
        onlySatellites: options.onlySatellites,
      })
    );
  }, 1000 * options.timedAdd);

  console.log(airborneList);
  return (
    <div className={styles.App}>
      <MenuSection appVersion="1.0" />
      <FdeSection />
    </div>
  );
}

export default App;
