import clsx from 'clsx';
import { DepFDE } from '../functions/genDepFdeData';
import DepartureFDE from './DepartureFDE/DepartureFDE';
import PendingDepartureFDE from './PendingDepartureFDE/PendingDepartureFDE';

import styles from './StripPanel.module.scss';

export enum Size {
  SM = 'Sm',
  MD = 'Md',
  LG = 'Lg',
}

interface StripPanelProps {
  title: string;
  height: Size;
  strips: DepFDE[];
}

const StripPanel = ({ title, height, strips }: StripPanelProps) => {
  function getPanelHeightClass() {
    return styles[`Size${height}`];
  }

  function displayStrips() {
    if (height === Size.LG) {
      //return displayAsFullFDE()
    }
    return displayAsPendingFDE();
  }

  function displayAsPendingFDE() {
    return strips.map((strip) => {
      return <PendingDepartureFDE key={strip.acId} {...strip} />;
    });
  }

  return (
    <div className={clsx(styles.StripPanel, getPanelHeightClass())}>
      <header className={clsx(styles.Header)}>
        <div className={clsx(styles.title)}>{title}</div>
        <div className={clsx(styles.stripCount)}>{strips?.length || 0}</div>
      </header>
      <section className={clsx(styles.Strips)}>{displayStrips()}</section>
    </div>
  );
};

export default StripPanel;
