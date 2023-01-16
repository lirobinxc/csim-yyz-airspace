import clsx from 'clsx';
import { useState } from 'react';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { TerminalPosition } from '../../phaser/types/SimTypes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { departureListActions } from '../state/slices/departureListSlice';
import {
  selectSimOptions,
  simOptionsActions,
} from '../state/slices/simOptionsSlice';

import styles from './MenuSection.module.scss';
import SimOptionsModal from './SimOptionsModal';

interface MenuSectionProps {
  appVersion: string;
}

const MenuSection = ({ appVersion }: MenuSectionProps) => {
  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function restartSim() {
    dispatch(departureListActions.restartSim());
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleVdp() {
    if (simOptions.allowVdp) {
      dispatch(simOptionsActions.disableVdp());
    } else {
      dispatch(simOptionsActions.enableVdp());
    }
  }

  function togglePauseSim() {
    if (simOptions.isPaused) {
      dispatch(simOptionsActions.unpauseSim());
    } else {
      dispatch(simOptionsActions.pauseSim());
    }
  }

  function getRwyNorth() {
    switch (simOptions.radarScene) {
      case RadarSceneKeys.RADAR_06s:
        return '05';
      case RadarSceneKeys.RADAR_24s:
        return '23';
      case RadarSceneKeys.RADAR_33s:
        return '33L';
      case RadarSceneKeys.RADAR_15s:
        return '15R';
      default:
        return 'XX';
    }
  }

  function getRwySouth() {
    switch (simOptions.radarScene) {
      case RadarSceneKeys.RADAR_06s:
        return '06L';
      case RadarSceneKeys.RADAR_24s:
        return '24R';
      case RadarSceneKeys.RADAR_33s:
        return '33R';
      case RadarSceneKeys.RADAR_15s:
        return '15L';
      default:
        return 'XX';
    }
  }

  function displayDepMenu() {
    return (
      <div className={styles.depButtonBar}>
        <button className={clsx(styles.spacing)}>UNDO</button>
        <div className={clsx(styles.spacing, styles.roleSelected)}>
          ALL
          <br /> DEPARTURE
        </div>
        <div className={clsx(styles.spacing, styles.wind)}>
          <div>220/02</div>
          <div>320/03</div>
        </div>
        <div className={clsx(styles.spacing, styles.timeAltimeter)}>
          <div>1110:29</div>
          <div>*2984*</div>
        </div>
        <button
          className={clsx(styles.spacing, styles.fir, {
            [styles.blinkingRedBg]: simOptions.isPaused,
          })}
          onClick={togglePauseSim}
        >
          {simOptions.isPaused ? 'PAUSED' : 'PAUSE'}
        </button>
        <button className={clsx(styles.spacing)}>XX</button>
        <button className={clsx(styles.spacing)}>A4</button>
        <button className={clsx(styles.spacing)}>A3</button>
        <button className={clsx(styles.spacing)}>A2</button>
        <button className={clsx(styles.spacing)}>A1</button>
        <button className={clsx(styles.spacing)} onClick={openModal}>
          OPTIONS
        </button>
        <button
          className={clsx(styles.spacing, styles.unhide)}
          onClick={restartSim}
        >
          RESTART
        </button>
        <button
          className={clsx(styles.spacing, styles.vdp, {
            [styles.bgGreen]: simOptions.allowVdp,
          })}
          onClick={toggleVdp}
        >
          VDP
        </button>
        <button className={clsx(styles.spacing, styles.normalSplit)}>
          NORMAL
        </button>
      </div>
    );
  }

  function displayArrMenu() {
    return (
      <div className={styles.arrButtonBar}>
        <button className={clsx(styles.spacing)}>UNDO</button>
        <div>
          <div className={clsx(styles.spacing, styles.roleSelected)}>ARR 1</div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            1244:48
          </div>
        </div>
        <div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxLg)}>
            060/08
          </div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxLg)}>
            080/15
          </div>
        </div>
        <div className={clsx(styles.spacing, styles.arrAltimeter)}>3006</div>
        <div className={clsx(styles.spacing, styles.arrAtis)}>E</div>
        <div>
          <div
            className={clsx(styles.spacing, styles.arrHalfBoxMd, styles.bgGrey)}
          >
            APP1
          </div>
          <div
            className={clsx(styles.spacing, styles.arrHalfBoxMd, styles.bgGrey)}
          >
            APP2
          </div>
        </div>
        <div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            {getRwyNorth()}
          </div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            {getRwySouth()}
          </div>
        </div>
        <div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            60+ 60+
          </div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            60+ 60+
          </div>
        </div>
        <div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            {getRwyNorth()} C 60+
          </div>
          <div className={clsx(styles.spacing, styles.arrHalfBoxMd)}>
            {getRwySouth()} C 60+
          </div>
        </div>
        <button
          className={clsx(styles.spacing, styles.fir, {
            [styles.blinkingRedBg]: simOptions.isPaused,
          })}
          onClick={togglePauseSim}
        >
          {simOptions.isPaused ? 'PAUSED' : 'PAUSE'}
        </button>
        <button className={clsx(styles.spacing)} onClick={openModal}>
          OPTIONS
        </button>
        <button
          className={clsx(styles.spacing, styles.unhide)}
          onClick={restartSim}
        >
          RESTART
        </button>
      </div>
    );
  }

  return (
    <header className={styles.MenuSection}>
      <SimOptionsModal isOpen={isModalOpen} requestCloseModal={closeModal} />
      <div className={styles.titleBar}>
        CSiM EXCDS Workstation Version {appVersion} by lirobinxc @ GitHub
      </div>
      <div className={styles.menuBar}></div>
      {simOptions.terminalPosition === TerminalPosition.DEPARTURE
        ? displayDepMenu()
        : displayArrMenu()}
    </header>
  );
};

export default MenuSection;
