import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { departureListActions } from '../state/slices/departureListSlice';
import { selectSimOptions } from '../state/slices/simOptionsSlice';

import styles from './MenuSection.module.scss';

interface MenuSectionProps {
  appVersion: string;
}

const MenuSection = ({ appVersion }: MenuSectionProps) => {
  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);

  function refreshStrips() {
    dispatch(
      departureListActions.refreshStrips({
        radarScene: simOptions.radarScene,
        count: simOptions.startingCount,
        isSingleOps: simOptions.isSingleOps,
      })
    );
  }

  return (
    <header className={styles.MenuSection}>
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
        <button className={clsx(styles.spacing)}>SD</button>
        <button className={clsx(styles.spacing)}>ND</button>
        <button
          className={clsx(styles.spacing, styles.unhide)}
          onClick={refreshStrips}
        >
          REFRESH
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
