import clsx from 'clsx';
import { ArrFDE } from '../functions/arrival/genArrFDE';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  selectSimOptions,
  simOptionsActions,
} from '../state/slices/simOptionsSlice';
import ArrivalFDE from './ArrivalFDE/ArrivalFDE';

import styles from './ArrStripPanel.module.scss';

export enum Size {
  SM = 'Sm',
  MD = 'Md',
  LG = 'Lg',
}

export enum ArrStripPanelName {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}

interface ArrStripPanelProps {
  title: ArrStripPanelName;
  strips: ArrFDE[];
}

const ArrStripPanel = ({ title, strips }: ArrStripPanelProps) => {
  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);

  function displayStrips() {
    if (title === ArrStripPanelName.PENDING) {
      return displayActiveFDE();
    }
  }

  function displayPendingFDE() {
    return strips.map((strip) => {
      return <ArrivalFDE key={strip.uniqueKey} {...strip} />;
    });
  }

  function displayActiveFDE() {
    return strips.map((strip) => {
      return <ArrivalFDE key={strip.uniqueKey} {...strip} />;
    });
  }

  return (
    <div className={clsx(styles.ArrStripPanel)}>
      <header className={clsx(styles.Header)}>
        <div className={clsx(styles.title)}>{title}</div>
        <div className={clsx(styles.stripCount)}>{strips?.length || 0}</div>
      </header>
      <section className={clsx(styles.Strips)}>{displayStrips()}</section>
    </div>
  );
};

export default ArrStripPanel;
