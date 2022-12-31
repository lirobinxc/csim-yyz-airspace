import clsx from 'clsx';

import styles from './StripPanel.module.scss';

export enum Size {
  SM = 'Sm',
  MD = 'Md',
  LG = 'Lg',
}

interface StripPanelProps {
  title: string;
  height: Size;
  strips?: [];
}

const StripPanel = ({ title, height, strips }: StripPanelProps) => {
  function getPanelHeightClass() {
    return styles[`Size${height}`];
  }

  return (
    <div className={clsx(styles.StripPanel, getPanelHeightClass())}>
      <header className={clsx(styles.Header)}>
        <div className={clsx(styles.title)}>{title}</div>
        <div className={clsx(styles.stripCount)}>{strips?.length}</div>
      </header>
      <section className={clsx(styles.Strips)}>{strips}</section>
    </div>
  );
};

export default StripPanel;
