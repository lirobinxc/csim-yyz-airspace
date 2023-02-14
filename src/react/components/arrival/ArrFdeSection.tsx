import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { ArrivalPhase } from '../../../phaser/types/ArrivalTypes';
import { ArrFDE } from '../../functions/arrival/genArrFDE';
import { ArrBedpost, StarName } from '../../functions/arrival/genArrRoute';
import _ from 'lodash';
import PhaserGame from '../../../phaser/PhaserGameConfig';
import { OtherSceneKeys } from '../../../phaser/types/SceneKeys';
import RadarScene from '../../../phaser/scenes/RadarScene';
import {
  PhaserCustomEvents,
  ReactCustomEvents,
} from '../../../phaser/types/CustomEvents';
import Plane from '../../../phaser/objects/Plane/Plane';

interface StripsList {
  pendingPanel: ArrFDE[];
  preActivePanel: ArrFDE[];
  activePanel: ArrFDE[];
}

const ArrFdeSection = () => {
  const dispatch = useAppDispatch();

  const strips = useAppSelector(selectArrivalList);
  const simOptions = useAppSelector(selectSimOptions);
  const [stripList, setStripList] = useState<StripsList>({
    pendingPanel: [] as ArrFDE[],
    preActivePanel: [] as ArrFDE[],
    activePanel: [] as ArrFDE[],
  });
  const [updateInterval, setUpdateInterval] = useState(5000);

  useEffect(() => {
    if (simOptions.gameSpeedMultiplier > 1) {
      setUpdateInterval(5000 / simOptions.gameSpeedMultiplier);
    } else {
      setUpdateInterval(5000);
    }
  }, [simOptions.gameSpeedMultiplier]);

  useEffect(() => {
    const RADAR_SCENE = PhaserGame.scene.keys[
      OtherSceneKeys.RADAR_BASE
    ] as RadarScene;

    RADAR_SCENE.events.on(
      PhaserCustomEvents.HIDE_PLANE_BUTTON_CLICKED,
      (plane: Plane) => {
        if (plane.Properties.fdeData.arr) {
          dispatch(
            arrivalListActions.deleteStrip(plane.Properties.fdeData.arr)
          );
        }
      }
    );

    RADAR_SCENE.events.on(PhaserCustomEvents.ARR_ACCEPTED, (plane: Plane) => {
      if (plane.Properties.fdeData.arr) {
        dispatch(arrivalListActions.setToActive(plane.Properties.fdeData.arr));
      }
    });
  }, [dispatch]);

  const processStrips = useCallback((stripList: ArrFDE[]) => {
    const stripsCue: StripsList = {
      pendingPanel: [] as ArrFDE[],
      preActivePanel: [] as ArrFDE[],
      activePanel: [] as ArrFDE[],
    };

    stripList.forEach((strip) => {
      const newStrip = { ...strip };

      if (strip.arrPhase === ArrivalPhase.PENDING) {
        stripsCue.pendingPanel.push(newStrip);
      }
      if (strip.arrPhase === ArrivalPhase.PRE_ACTIVE) {
        stripsCue.preActivePanel.push(newStrip);
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

    if (stripList.pendingPanel.length < 8) {
      dispatch(
        arrivalListActions.addArrStrip({
          radarScene: simOptions.radarScene,
          isSingleOps: simOptions.isSingleOps,
          activeBedposts: simOptions.activeArrBedposts,
          innerOnly: simOptions.arrInnerPracticeMode,
        })
      );
    }
  }, updateInterval);

  // Interval: Move from panel PENDING -> PRE_ACTIVE
  useInterval(() => {
    if (simOptions.isPaused) return;

    const allAirborneStrips = [
      ...stripList.activePanel,
      ...stripList.preActivePanel,
    ];

    // Break if 10 a/c in the sequence
    if (allAirborneStrips.length >= simOptions.maxActiveArrivals) return;

    const currTime = Date.now();

    const nextPendingStrip = stripList.pendingPanel[0];

    const lastAirborneStrip = allAirborneStrips[allAirborneStrips.length - 1];
    if (lastAirborneStrip) {
      if (lastAirborneStrip.arrBedpost === nextPendingStrip.arrBedpost) {
        dispatch(arrivalListActions.deleteStrip(nextPendingStrip));
      }
    }

    if (nextPendingStrip) {
      console.log('Next bedpost:', nextPendingStrip.arrBedpost);

      const nextBedpost = nextPendingStrip.arrBedpost;
      const prevStripWithSameBedpost = _.findLast(
        allAirborneStrips,
        (strip) => {
          return strip.arrBedpost === nextBedpost;
        }
      );

      if (!prevStripWithSameBedpost) {
        dispatch(arrivalListActions.setToPreActive(nextPendingStrip));
      }

      if (prevStripWithSameBedpost) {
        if (nextPendingStrip.isStraightIn) {
          const randomStraightInTime = _.random(
            simOptions.intervalBetweenNormalArrs /
              simOptions.gameSpeedMultiplier,
            simOptions.intervalBetweenStraightInArrs /
              simOptions.gameSpeedMultiplier
          );

          if (
            currTime >
            prevStripWithSameBedpost.arrivalTime + randomStraightInTime
          ) {
            dispatch(arrivalListActions.setToPreActive(nextPendingStrip));
          }
        }
        if (!nextPendingStrip.isStraightIn) {
          if (
            currTime >
            prevStripWithSameBedpost.arrivalTime +
              simOptions.intervalBetweenNormalArrs /
                simOptions.gameSpeedMultiplier
          ) {
            dispatch(arrivalListActions.setToPreActive(nextPendingStrip));
          }
        }
      }
    }
  }, updateInterval);

  return (
    <main className={styles.ArrFdeSection}>
      <ArrStripPanel
        panelName={ArrStripPanelName.PENDING}
        strips={[...stripList.pendingPanel, ...stripList.preActivePanel]}
      />
      <ArrStripPanel
        panelName={ArrStripPanelName.ACTIVE}
        strips={stripList.activePanel}
      />
    </main>
  );
};

export default ArrFdeSection;
