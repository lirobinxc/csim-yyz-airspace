import { useCallback, useEffect, useState } from 'react';
import useInterval from 'use-interval';
import { useRandomInterval } from '../functions/hooks/useRandomInterval';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { selectSimOptions } from '../state/slices/simOptionsSlice';
import clsx from 'clsx';
import ArrStripPanel, { ArrStripPanelName } from './ArrStripPanel';
import {
  arrivalListActions,
  selectArrivalList,
} from '../state/slices/arrivalListSlice';

import styles from './ArrFdeSection.module.scss';
import { ArrivalPhase } from '../functions/arrival/arrivalTypes';
import { ArrFDE } from '../functions/arrival/genArrFDE';

const FdeSectionArr = () => {
  const dispatch = useAppDispatch();

  const strips = useAppSelector(selectArrivalList);
  const simOptions = useAppSelector(selectSimOptions);
  const [stripList, setStripList] = useState({
    pendingPanel: [] as ArrFDE[],
    activePanel: [] as ArrFDE[],
  });

  const processStrips = useCallback((stripList: ArrFDE[]) => {
    const stripsCue = {
      pendingPanel: [] as ArrFDE[],
      activePanel: [] as ArrFDE[],
    };

    stripList.forEach((strip) => {
      const newStrip = { ...strip };

      switch (strip.arrPhase) {
        case ArrivalPhase.PENDING:
          stripsCue.pendingPanel.push(newStrip);
          break;
        case ArrivalPhase.ACTIVE:
          stripsCue.activePanel.push(newStrip);
          break;
      }
    });
    setStripList(stripsCue);
  }, []);

  useEffect(() => {
    processStrips(strips);
  }, [strips, processStrips]);

  // Interval: Add new Arrival strip
  useRandomInterval(
    () => {
      if (simOptions.isPaused) return;

      if (stripList.pendingPanel.length < 6) {
        dispatch(
          arrivalListActions.addArrStrip({
            radarScene: simOptions.radarScene,
            isSingleOps: simOptions.isSingleOps,
          })
        );
      }
    },
    simOptions.intervalBetweenSatelliteDeps * 0.25,
    simOptions.intervalBetweenSatelliteDeps * 0.5
  );

  // Interval: Move from panel PENDING -> ACTIVE
  useInterval(() => {
    if (simOptions.isPaused) return;

    const currTime = Date.now();
    const currPendingFde = stripList.pendingPanel[0];

    if (currPendingFde) {
      if (
        currTime >
        currPendingFde.inPositionTime + simOptions.intervalBetweenArrivals
      ) {
        dispatch(arrivalListActions.setToActive(currPendingFde));
      }
    }
  }, 5000);

  return (
    <main className={styles.ArrFdeSection}>
      <ArrStripPanel
        title={ArrStripPanelName.PENDING}
        strips={stripList.pendingPanel}
      />
      <ArrStripPanel
        title={ArrStripPanelName.PENDING}
        strips={stripList.pendingPanel}
      />
    </main>
  );
};

export default FdeSectionArr;
