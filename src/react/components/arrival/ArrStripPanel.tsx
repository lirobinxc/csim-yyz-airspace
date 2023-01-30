import clsx from 'clsx';
import { ArrFDE } from '../../functions/arrival/genArrFDE';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  selectSimOptions,
  simOptionsActions,
} from '../../state/slices/simOptionsSlice';
import ArrivalFDE from '../arrival/ArrivalFDE/ArrivalFDE';

import styles from './ArrStripPanel.module.scss';
import PendingArrivalFDE from './PendingArrivalFDE/PendingArrivalFDE';

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
  panelName: ArrStripPanelName;
  strips: ArrFDE[];
}

const ArrStripPanel = ({ panelName, strips }: ArrStripPanelProps) => {
  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);

  function displayStrips() {
    if (panelName === ArrStripPanelName.PENDING) {
      return displayPendingFDE();
    }
    if (panelName === ArrStripPanelName.ACTIVE) {
      return displayActiveFDE();
    }
  }

  function displayPendingFDE() {
    return strips.map((strip) => {
      return <PendingArrivalFDE key={strip.uniqueKey} {...strip} />;
    });
  }

  function displayActiveFDE() {
    return strips.map((strip) => {
      return <ArrivalFDE key={strip.uniqueKey} {...strip} />;
    });
  }

  return (
    <div
      className={clsx(styles.ArrStripPanel, {
        [styles.SizeLg]: panelName === ArrStripPanelName.ACTIVE,
      })}
    >
      <header className={clsx(styles.Header)}>
        <div className={clsx(styles.panelName)}>{panelName}</div>
        <div className={clsx(styles.stripCount)}>{strips?.length || 0}</div>
      </header>
      <section
        className={clsx({
          [styles.PendingStrips]: panelName === ArrStripPanelName.PENDING,
          [styles.ActiveStrips]: panelName === ArrStripPanelName.ACTIVE,
        })}
      >
        {displayStrips()}
      </section>
    </div>
  );
};

export default ArrStripPanel;
