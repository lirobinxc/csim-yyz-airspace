import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import useInterval from 'use-interval';
import PhaserGame from '../../phaser/PhaserGameConfig';
import { OtherSceneKeys } from '../../phaser/types/SceneKeys';
import {
  DeparturePhase,
  DeparturePosition,
  DepFDE,
} from '../functions/genDepFdeData';
import { useRandomInterval } from '../functions/hooks/useRandomInterval';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  departureListActions,
  selectDepartureList,
} from '../state/slices/departureListSlice';
import { selectSimOptions } from '../state/slices/simOptionsSlice';

import styles from './FdeSection.module.scss';
import SimOptionsModal from './SimOptionsModal';
import StripPanel, { Size } from './StripPanel';

const FdeSection = () => {
  const dispatch = useAppDispatch();
  const strips = useAppSelector(selectDepartureList);
  const simOptions = useAppSelector(selectSimOptions);

  const [stripList, setStripList] = useState({
    readyNorthPanel: [] as DepFDE[],
    readySouthPanel: [] as DepFDE[],
    inPositionNorthPanel: [] as DepFDE[],
    inPositionSouthPanel: [] as DepFDE[],
    airborneNorthPanel: [] as DepFDE[],
    airborneSouthPanel: [] as DepFDE[],
    satellitePendingPanel: [] as DepFDE[],
  });

  const processStrips = useCallback((stripList: DepFDE[]) => {
    const stripsCue = {
      readyNorthPanel: [] as DepFDE[],
      readySouthPanel: [] as DepFDE[],
      inPositionNorthPanel: [] as DepFDE[],
      inPositionSouthPanel: [] as DepFDE[],
      airborneNorthPanel: [] as DepFDE[],
      airborneSouthPanel: [] as DepFDE[],
      satellitePendingPanel: [] as DepFDE[],
    };

    stripList.forEach((strip) => {
      switch (strip.depPhase) {
        case DeparturePhase.READY:
          if (strip.depPosition === DeparturePosition.ND)
            stripsCue.readyNorthPanel.push(strip);
          if (strip.depPosition === DeparturePosition.SD)
            stripsCue.readySouthPanel.push(strip);
          break;
        case DeparturePhase.IN_POSITION:
          if (strip.depPosition === DeparturePosition.ND)
            stripsCue.inPositionNorthPanel.push(strip);
          if (strip.depPosition === DeparturePosition.SD)
            stripsCue.inPositionSouthPanel.push(strip);
          break;
        case DeparturePhase.AIRBORNE:
          if (strip.depPosition === DeparturePosition.ND)
            stripsCue.airborneNorthPanel.push(strip);
          if (strip.depPosition === DeparturePosition.SD)
            stripsCue.airborneSouthPanel.push(strip);
          break;
        case DeparturePhase.SATELLITE_PENDING:
          stripsCue.satellitePendingPanel.push(strip);
          break;
      }
    });

    setStripList(stripsCue);
  }, []);

  useEffect(() => {
    processStrips(strips);
  }, [strips, processStrips]);

  // useEffect(() => {
  //   if(stripList.airborneNorthPanel.length === 0 && stripList.airborneSouthPanel.length === 0) {
  //     dispatch()
  //   }
  // },[stripList])

  // Interval: Add new strip
  useRandomInterval(() => {
    if (
      stripList.readyNorthPanel.length < 3 ||
      stripList.readySouthPanel.length < 3
    ) {
      dispatch(
        departureListActions.addStrip({
          radarScene: simOptions.radarScene,
          isSingleOps: simOptions.isSingleOps,
          prevFdeSidName: strips[strips.length - 1].sidName,
        })
      );
    }
  }, ...simOptions.newStripInterval);

  // Interval: Move from panels READY N/S -> IN POSITION N/S
  useRandomInterval(
    () => {
      if (stripList.inPositionNorthPanel.length === 0) {
        dispatch(
          departureListActions.setToInPosition(stripList.readyNorthPanel[0])
        );
      }
      if (stripList.airborneNorthPanel.length === 0) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionNorthPanel[0])
        );
      }
    },
    5_000,
    20_000
  );
  useRandomInterval(
    () => {
      if (stripList.inPositionSouthPanel.length === 0) {
        dispatch(
          departureListActions.setToInPosition(stripList.readySouthPanel[0])
        );
      }
      if (stripList.airborneSouthPanel.length === 0) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionSouthPanel[0])
        );
      }
    },
    5_000,
    20_000
  );

  // Interval: (NORMAL) Move from panel IN POSITION -> AIRBORNE
  useInterval(() => {
    const currTime = Date.now();
    const currInPositionNFde = stripList.inPositionNorthPanel[0];
    const currInPositionSFde = stripList.inPositionSouthPanel[0];

    if (currInPositionNFde) {
      if (
        currTime >
        currInPositionNFde.inPositionTime + simOptions.intervalBetweenNormalDeps
      ) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionNorthPanel[0])
        );
      }
    }
    if (currInPositionSFde) {
      if (
        currTime >
        currInPositionSFde.inPositionTime + simOptions.intervalBetweenNormalDeps
      ) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionSouthPanel[0])
        );
      }
    }
  }, 5000);

  // Interval: (VISUAL DEP) Move from panel IN POSITION -> AIRBORNE
  // useRandomInterval(() => {
  //   dispatch(departureListActions.setToAirborne({radarScene: simOptions.radarScene, fde: stripList.inPositionNPanel[0]))};
  // }, ...simOptions.newStripInterval);

  // useRandomInterval(() => {
  //   dispatch(departureListActions.setToAirborne({radarScene: simOptions.radarScene, fde: stripList.inPositionSPanel[0]))};
  // }, ...simOptions.newStripInterval);

  return (
    <main className={styles.FdeSection}>
      <section className={styles.NorthDepCol}>
        <StripPanel
          title="READY - N"
          height={Size.SM}
          strips={stripList.readyNorthPanel}
        />
        <StripPanel
          title="IN POSITION - N"
          height={Size.SM}
          strips={stripList.inPositionNorthPanel}
        />
        <StripPanel
          title="AIRBORNE - N"
          height={Size.LG}
          strips={stripList.airborneNorthPanel}
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
          strips={stripList.readySouthPanel}
        />
        <StripPanel
          title="IN POSITION - S"
          height={Size.SM}
          strips={stripList.inPositionSouthPanel}
        />
        <StripPanel
          title="AIRBORNE - S"
          height={Size.LG}
          strips={stripList.airborneSouthPanel}
        />
      </section>
    </main>
  );
};

export default FdeSection;
