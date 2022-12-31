import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  DeparturePhase,
  DeparturePosition,
  DepFDE,
} from '../functions/genDepFdeData';

import styles from './FdeSection.module.scss';
import StripPanel, { Size } from './StripPanel';

interface FdeSectionProps {
  strips: DepFDE[];
}

const FdeSection = ({ strips }: FdeSectionProps) => {
  const [stripList, setStripList] = useState({
    readyNPanel: [] as DepFDE[],
    readySPanel: [] as DepFDE[],
    inPositionNPanel: [] as DepFDE[],
    inPositionSPanel: [] as DepFDE[],
    airborneNPanel: [] as DepFDE[],
    airborneSPanel: [] as DepFDE[],
    satellitePendingPanel: [] as DepFDE[],
  });

  useEffect(() => {
    processStrips();
  }, [strips]);

  function processStrips() {
    console.log('processing strips');

    const stripsCue = {
      readyNPanel: [] as DepFDE[],
      readySPanel: [] as DepFDE[],
      inPositionNPanel: [] as DepFDE[],
      inPositionSPanel: [] as DepFDE[],
      airborneNPanel: [] as DepFDE[],
      airborneSPanel: [] as DepFDE[],
      satellitePendingPanel: [] as DepFDE[],
    };

    strips.forEach((strip) => {
      switch (strip.depPhase) {
        case DeparturePhase.READY:
          if (strip.depPosition === DeparturePosition.ND)
            stripsCue.readyNPanel.push(strip);

          if (strip.depPosition === DeparturePosition.SD)
            stripsCue.readySPanel.push(strip);
          break;
      }
    });

    setStripList(stripsCue);
  }

  return (
    <main className={styles.FdeSection}>
      <section className={styles.NorthDepCol}>
        <StripPanel
          title="READY - N"
          height={Size.SM}
          strips={stripList.readyNPanel}
        />
        <StripPanel
          title="IN POSITION - N"
          height={Size.SM}
          strips={stripList.inPositionNPanel}
        />
        <StripPanel
          title="AIRBORNE - N"
          height={Size.LG}
          strips={stripList.airborneNPanel}
        />
        <StripPanel
          title="SATELLITE PENDING"
          height={Size.MD}
          strips={stripList.satellitePendingPanel}
        />
      </section>
      <section className={styles.SouthDepCol}>
        <StripPanel
          title="READY - S"
          height={Size.SM}
          strips={stripList.readySPanel}
        />
        <StripPanel
          title="IN POSITION - S"
          height={Size.SM}
          strips={stripList.inPositionSPanel}
        />
        <StripPanel
          title="AIRBORNE - S"
          height={Size.LG}
          strips={stripList.airborneSPanel}
        />
      </section>
    </main>
  );
};

export default FdeSection;
