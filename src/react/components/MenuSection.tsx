import clsx from 'clsx';
import { useEffect, useState } from 'react';
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

  return (
    <header className={styles.MenuSection}>
      <SimOptionsModal isOpen={isModalOpen} requestCloseModal={closeModal} />
      <div className={styles.titleBar}>
        CSiM EXCDS Workstation Version {appVersion} by lirobinxc @ GitHub
      </div>
      <div className={styles.infoBar}>
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
        <button className={clsx(styles.spacing, styles.fir)}>FIR</button>
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
        <button className={clsx(styles.spacing, styles.vdp)}>VDP</button>
        <button className={clsx(styles.spacing, styles.normalSplit)}>
          NORMAL
        </button>
      </div>
    </header>
  );
};

export default MenuSection;
