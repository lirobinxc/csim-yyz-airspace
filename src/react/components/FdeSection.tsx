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
  const [readyNPanel, setReadyNPanel] = useState([] as DepFDE[]);
  const [readySPanel, setReadySPanel] = useState([] as DepFDE[]);
  const [inPositionNPanel, setInPositionNPanel] = useState([] as DepFDE[]);
  const [inPositionSPanel, setInPositionSPanel] = useState([] as DepFDE[]);
  const [airborneNPanel, setAirborneNPanel] = useState([] as DepFDE[]);
  const [airborneSPanel, setAirborneSPanel] = useState([] as DepFDE[]);
  const [satellitePendingPanel, setSatellitePendingPanel] = useState(
    [] as DepFDE[]
  );

  useEffect(() => {
    processStrips();
  }, [strips]);

  function processStrips() {
    strips.forEach((strip) => {
      switch (strip.depPhase) {
        case DeparturePhase.READY:
          if (strip.depPosition === DeparturePosition.ND)
            setReadyNPanel([...readyNPanel, strip]);
          if (strip.depPosition === DeparturePosition.SD)
            setReadyNPanel([...readySPanel, strip]);
          break;
      }
    });
  }

  return (
    <main className={styles.FdeSection}>
      <section className={styles.NorthDepCol}>
        <StripPanel title="READY - N" height={Size.SM} strips={readyNPanel} />
        <StripPanel
          title="IN POSITION - N"
          height={Size.SM}
          strips={inPositionNPanel}
        />
        <StripPanel
          title="AIRBORNE - N"
          height={Size.LG}
          strips={airborneNPanel}
        />
        <StripPanel
          title="SATELLITE PENDING"
          height={Size.MD}
          strips={satellitePendingPanel}
        />
      </section>
      <section className={styles.SouthDepCol}>
        <StripPanel title="READY - S" height={Size.SM} strips={readySPanel} />
        <StripPanel
          title="IN POSITION - S"
          height={Size.SM}
          strips={inPositionSPanel}
        />
        <StripPanel
          title="AIRBORNE - S"
          height={Size.LG}
          strips={airborneSPanel}
        />
      </section>
    </main>
  );
};

export default FdeSection;
