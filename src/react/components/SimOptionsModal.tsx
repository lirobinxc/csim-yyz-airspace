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
import { TerminalPosition } from '../../phaser/types/SimTypes';
import { ArrBedpost, StarName } from '../functions/arrival/genArrRoute';

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

  function setTerminalPosition(e: React.FormEvent) {
    const target = e.target as HTMLOptionElement;
    const value = target.value as TerminalPosition;

    setTempOptions({ ...tempOptions, terminalPosition: value });
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

    setTempOptions({ ...tempOptions, intervalBetweenVisualDeps: value * 1000 });
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

  function setIntervalBetweenArrivalsNormal(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = simOptions.intervalBetweenNormalArrs;

    setTempOptions({
      ...tempOptions,
      intervalBetweenNormalArrs: value,
    });
  }

  function setIntervalBetweenArrivalsStraightIn(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    let value = Number(target.value);

    if (isNaN(value)) value = simOptions.intervalBetweenStraightInArrs;

    setTempOptions({
      ...tempOptions,
      intervalBetweenStraightInArrs: value,
    });
  }

  function handleActiveBedposts(e: React.FormEvent) {
    const target = e.target as HTMLInputElement;
    let value = target.value as ArrBedpost;

    if (tempOptions.activeArrBedposts.includes(value)) {
      const newActiveBedposts = tempOptions.activeArrBedposts.filter(
        (bedpost) => bedpost !== value
      );

      setTempOptions({
        ...tempOptions,
        activeArrBedposts: newActiveBedposts,
      });
    }

    if (!tempOptions.activeArrBedposts.includes(value)) {
      const newActiveBedposts = [...tempOptions.activeArrBedposts, value];

      setTempOptions({
        ...tempOptions,
        activeArrBedposts: newActiveBedposts,
      });
    }
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
            Terminal Position
            <select
              onChange={setTerminalPosition}
              defaultValue={tempOptions.terminalPosition}
            >
              <option value={TerminalPosition.DEPARTURE}>Departure</option>
              <option value={TerminalPosition.ARRIVAL}>Arrival</option>
            </select>
          </label>
          <label>
            CYYZ Runway Config
            <select
              onChange={setRadarScene}
              defaultValue={simOptions.radarScene}
            >
              <option value={RadarSceneKeys.RADAR_06s}>Rwy 05/06LR</option>
              <option value={RadarSceneKeys.RADAR_24s}>Rwy 23/24LR</option>
              <option value={RadarSceneKeys.RADAR_33s}>Rwy 33LR</option>
              <option value={RadarSceneKeys.RADAR_15s}>Rwy 15LR</option>
            </select>
          </label>
          {tempOptions.terminalPosition === TerminalPosition.DEPARTURE && (
            <>
              <h3 className={styles.optionSubheader}>Departure Settings</h3>
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
            </>
          )}
          {tempOptions.terminalPosition === TerminalPosition.ARRIVAL && (
            <>
              <h3 className={styles.optionSubheader}>Arrival Settings</h3>
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
              <h3>Active Bedposts</h3>
              <label>
                <input
                  type="checkbox"
                  checked={tempOptions.activeArrBedposts.includes(
                    ArrBedpost.BOXUM
                  )}
                  value={ArrBedpost.BOXUM}
                  onChange={handleActiveBedposts}
                ></input>
                BOXUM / DUVOS
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={tempOptions.activeArrBedposts.includes(
                    ArrBedpost.NUBER
                  )}
                  value={ArrBedpost.NUBER}
                  onChange={handleActiveBedposts}
                ></input>
                NUBER / NAKBO
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={tempOptions.activeArrBedposts.includes(
                    ArrBedpost.LINNG
                  )}
                  value={ArrBedpost.LINNG}
                  onChange={handleActiveBedposts}
                ></input>
                LINNG / VERKO
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={tempOptions.activeArrBedposts.includes(
                    ArrBedpost.IMEBA
                  )}
                  value={ArrBedpost.IMEBA}
                  onChange={handleActiveBedposts}
                ></input>
                IMEBA / VIBLI
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={tempOptions.activeArrBedposts.includes(
                    ArrBedpost.RAGID
                  )}
                  value={ArrBedpost.RAGID}
                  onChange={handleActiveBedposts}
                ></input>
                RAGID / UDNOX
              </label>
              <h3>Interval between Normal Arrivals (per Bedpost)</h3>
              <label className={styles.intervalBox}>
                <input
                  type="number"
                  name="minIntervalArrivalNormal"
                  className={styles.number}
                  value={tempOptions.intervalBetweenNormalArrs / 1000}
                  onChange={setIntervalBetweenArrivalsNormal}
                />{' '}
                seconds
              </label>
              <h3>Interval between Straight-in Arrivals (per Bedpost)</h3>
              <label className={styles.intervalBox}>
                <input
                  type="number"
                  name="minIntervalArrivalNormal"
                  className={styles.number}
                  value={tempOptions.intervalBetweenStraightInArrs / 1000}
                  onChange={setIntervalBetweenArrivalsStraightIn}
                />{' '}
                seconds
              </label>
            </>
          )}
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
