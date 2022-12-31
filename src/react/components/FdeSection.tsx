import clsx from 'clsx';

import styles from './FdeSection.module.scss';
import StripPanel, { Size } from './StripPanel';

interface FdeSectionProps {}

const FdeSection = () => {
  return (
    <main className={styles.FdeSection}>
      <section className={styles.NorthDepCol}>
        <StripPanel title="READY - N" height={Size.SM} />
        <StripPanel title="IN POSITION - N" height={Size.SM} />
        <StripPanel title="AIRBORNE - N" height={Size.LG} />
        <StripPanel title="SATELLITE PENDING" height={Size.MD} />
      </section>
      <section className={styles.SouthDepCol}>
        <StripPanel title="READY - S" height={Size.SM} />
        <StripPanel title="IN POSITION - S" height={Size.SM} />
        <StripPanel title="AIRBORNE - S" height={Size.LG} />
      </section>
    </main>
  );
};

export default FdeSection;
