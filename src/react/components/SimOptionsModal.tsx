import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { departureListActions } from '../state/slices/departureListSlice';
import {
  selectSimOptions,
  simOptionsActions,
} from '../state/slices/simOptionsSlice';
import Modal from 'react-modal';

import styles from './SimOptionsModal.module.scss';
import React, { useState } from 'react';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';

interface SimOptionsModalProps {
  isOpen: boolean;
  requestCloseModal: () => void;
}

Modal.setAppElement('#root');

const SimOptionsModal = ({
  isOpen,
  requestCloseModal: closeModal,
}: SimOptionsModalProps) => {
  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);
  const [tempOptions, setTempOptions] = useState(simOptions);

  function setRadarScene(e: React.FormEvent) {
    const target = e.target as HTMLOptionElement;
    const value = target.value as RadarSceneKeys;
    setTempOptions({ ...tempOptions, radarScene: value });
  }

  function setIsSingleOps(e: React.FormEvent) {
    setTempOptions({ ...tempOptions, isSingleOps: !tempOptions.isSingleOps });
  }

  function setStartingCount(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = simOptions.startingCount;
    if (value > 99) value = 99;
    if (value < 1) value = 1;

    setTempOptions({ ...tempOptions, startingCount: value });
  }

  function setIntervalBetweenNormalDeps(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = simOptions.intervalBetweenNormalDeps;

    setTempOptions({ ...tempOptions, intervalBetweenNormalDeps: value * 1000 });
  }

  function setIntervalBetweenVisualDeps(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = simOptions.intervalBetweenVisualDeps;

    setTempOptions({ ...tempOptions, intervalBetweenNormalDeps: value * 1000 });
  }

  function setIntervalBetweenSatelliteDeps(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = simOptions.intervalBetweenSatelliteDeps;

    setTempOptions({
      ...tempOptions,
      intervalBetweenSatelliteDeps: value * 1000,
    });
  }

  function applyOptions() {
    dispatch(simOptionsActions.applyOptions(tempOptions));
    dispatch(departureListActions.restartSim());
  }

  function restoreDefaults() {
    dispatch(simOptionsActions.resetLocalStorageToDefaults());
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="SimOptions Modal"
      portalClassName={styles.SimOptionsModal}
    >
      <h2>CSiM Options</h2>
      <section className={styles.formContainer}>
        <form>
          <label>
            CYYZ Runway Config
            <select onChange={setRadarScene}>
              <option value={RadarSceneKeys.RADAR_06s}>Rwy 05/06LR</option>
            </select>
          </label>
          <label>
            Single runway operations
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={tempOptions.isSingleOps}
              onChange={setIsSingleOps}
            />
          </label>
          <label>
            Starting # of strips
            <input
              type="number"
              name="startingCount"
              className={styles.number}
              value={tempOptions.startingCount}
              onChange={setStartingCount}
            />
          </label>
          <h3>Interval between Normal Departures</h3>
          <label className={styles.intervalBox}>
            <input
              type="number"
              name="minIntervalNormal"
              className={styles.number}
              value={tempOptions.intervalBetweenNormalDeps / 1000}
              onChange={setIntervalBetweenNormalDeps}
            />{' '}
            seconds
          </label>
          <h3>Interval between Visual Departures</h3>
          <label className={styles.intervalBox}>
            <input
              type="number"
              name="minIntervalVisual"
              className={styles.number}
              value={tempOptions.intervalBetweenVisualDeps / 1000}
              onChange={setIntervalBetweenVisualDeps}
            />{' '}
            seconds
          </label>
          <h3>Interval between Satellite Departures</h3>
          <label className={styles.intervalBox}>
            <input
              type="number"
              name="minIntervalVisual"
              className={styles.number}
              value={tempOptions.intervalBetweenSatelliteDeps / 1000}
              onChange={setIntervalBetweenSatelliteDeps}
            />{' '}
            seconds
          </label>
          <button className={styles.applyButton} onClick={applyOptions}>
            APPLY OPTIONS
          </button>
          <button
            className={styles.restoreDefaultsButton}
            onClick={restoreDefaults}
          >
            Restore Defaults
          </button>
        </form>
      </section>
    </Modal>
  );
};

export default SimOptionsModal;
