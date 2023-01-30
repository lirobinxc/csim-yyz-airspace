import { useCallback, useEffect, useState } from 'react';
import useInterval from 'use-interval';
import { useRandomInterval } from '../../functions/hooks/useRandomInterval';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { selectSimOptions } from '../../state/slices/simOptionsSlice';
import clsx from 'clsx';
import ArrStripPanel, { ArrStripPanelName } from './ArrStripPanel';
import {
  arrivalListActions,
  selectArrivalList,
} from '../../state/slices/arrivalListSlice';

import styles from './ArrFdeSection.module.scss';
import { ArrivalPhase } from '../../functions/arrival/arrivalTypes';
import { ArrFDE } from '../../functions/arrival/genArrFDE';
import { ArrBedpost, StarName } from '../../functions/arrival/genArrRoute';
import _ from 'lodash';

interface StripsList {
  pendingPanel: ArrFDE[];
  activePanel: ArrFDE[];
}

const FdeSectionArr = () => {
  const dispatch = useAppDispatch();

  const strips = useAppSelector(selectArrivalList);
  const simOptions = useAppSelector(selectSimOptions);
  const [stripList, setStripList] = useState<StripsList>({
    pendingPanel: [] as ArrFDE[],
    activePanel: [] as ArrFDE[],
  });

  const processStrips = useCallback((stripList: ArrFDE[]) => {
    const stripsCue: StripsList = {
      pendingPanel: [] as ArrFDE[],
      activePanel: [] as ArrFDE[],
    };

    stripList.forEach((strip) => {
      const newStrip = { ...strip };

      if (strip.arrPhase === ArrivalPhase.PENDING) {
        stripsCue.pendingPanel.push(newStrip);
      }
      if (strip.arrPhase === ArrivalPhase.ACTIVE) {
        stripsCue.activePanel.push(newStrip);
      }
    });

    setStripList(stripsCue);
  }, []);

  useEffect(() => {
    processStrips(strips);
  }, [strips, processStrips]);

  // Interval: Add new pending Arrival strip
  useInterval(() => {
    if (simOptions.isPaused) return;

    if (stripList.pendingPanel.length < 6) {
      dispatch(
        arrivalListActions.addArrStrip({
          radarScene: simOptions.radarScene,
          isSingleOps: simOptions.isSingleOps,
          activeBedposts: simOptions.activeArrBedposts,
        })
      );
    }
  }, 5000);

  // Interval: Move from panel PENDING -> ACTIVE
  useInterval(() => {
    if (simOptions.isPaused) return;

    const currTime = Date.now();
    const currPendingFde = stripList.pendingPanel[0];

    if (currPendingFde) {
      const currBedpost = currPendingFde.arrBedpost;
      const prevStripWithSameBedpost = _.findLast(
        stripList.activePanel,
        (strip) => {
          return strip.arrBedpost === currBedpost;
        }
      );

      if (!prevStripWithSameBedpost) {
        dispatch(arrivalListActions.setToActive(currPendingFde));
      }

      if (prevStripWithSameBedpost) {
        if (currPendingFde.isStraightIn) {
          if (
            currTime >
            prevStripWithSameBedpost.arrivalTime +
              simOptions.intervalBetweenStraightInArrs
          ) {
            console.log('dispatching Straightin');
            dispatch(arrivalListActions.setToActive(currPendingFde));
          }
        }
        if (!currPendingFde.isStraightIn) {
          if (
            currTime >
            prevStripWithSameBedpost.arrivalTime +
              simOptions.intervalBetweenNormalArrs
          ) {
            console.log('dispatching Normal');

            dispatch(arrivalListActions.setToActive(currPendingFde));
          }
        }
      }
    }
  }, 5000);

  return (
    <main className={styles.ArrFdeSection}>
      <ArrStripPanel
        panelName={ArrStripPanelName.PENDING}
        strips={stripList.pendingPanel}
      />
      <ArrStripPanel
        panelName={ArrStripPanelName.ACTIVE}
        strips={stripList.activePanel}
      />
    </main>
  );
};

export default FdeSectionArr;
