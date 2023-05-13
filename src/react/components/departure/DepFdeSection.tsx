import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useInterval from 'use-interval';
import { AcType } from '../../../engine/types/AircraftTypes';
import { determineIfVdpAllowed } from '../../functions/departure/determineIfVdpAllowed';
import { DepFDE } from '../../functions/departure/genDepFDE';
import { useRandomInterval } from '../../functions/hooks/useRandomInterval';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  departureListActions,
  selectDepartureList,
} from '../../state/slices/departureListSlice';
import { selectSimOptions } from '../../state/slices/simOptionsSlice';

import styles from './DepFdeSection.module.scss';
import DepStripPanel, { Size, DepStripPanelName } from './DepStripPanel';
import {
  DeparturePhase,
  DeparturePosition,
} from '../../functions/departure/departureTypes';
import PhaserGame from '../../../engine/PhaserGameConfig';
import { OtherSceneKeys } from '../../../engine/types/SceneKeys';
import RadarScene from '../../../engine/scenes/RadarScene';
import { PhaserCustomEvents } from '../../../engine/types/CustomEvents';
import Plane from '../../../engine/objects/Plane/Plane';

const DepFdeSection = () => {
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
  const [timeOfLastAirborneSatellite, setTimeOfLastAirborneSatellite] =
    useState(0);
  const [updateInterval, setUpdateInterval] = useState(5000);

  useEffect(() => {
    if (simOptions.gameSpeedMultiplier > 1) {
      setUpdateInterval(5000 / simOptions.gameSpeedMultiplier);
    } else {
      setUpdateInterval(5000);
    }
  }, [simOptions.gameSpeedMultiplier]);

  useMemo(() => {
    const RADAR_SCENE = PhaserGame.scene.keys[
      OtherSceneKeys.RADAR_BASE
    ] as RadarScene;

    RADAR_SCENE.events.on(
      PhaserCustomEvents.DESTROY_PLANE_BUTTON_CLICKED,
      (plane: Plane) => {
        if (plane.Properties.fdeData.dep) {
          dispatch(
            departureListActions.deleteStrip(plane.Properties.fdeData.dep)
          );
        }
      }
    );
  }, [dispatch]);

  const processStrips = useCallback(
    (stripList: DepFDE[]) => {
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
        const newStrip = { ...strip };

        switch (strip.depPhase) {
          case DeparturePhase.READY:
            if (strip.depPosition === DeparturePosition.ND)
              stripsCue.readyNorthPanel.push(newStrip);

            if (strip.depPosition === DeparturePosition.SD)
              stripsCue.readySouthPanel.push(newStrip);
            break;
          case DeparturePhase.IN_POSITION:
            if (strip.depPosition === DeparturePosition.ND)
              stripsCue.inPositionNorthPanel.push(newStrip);
            if (strip.depPosition === DeparturePosition.SD)
              stripsCue.inPositionSouthPanel.push(newStrip);
            break;
          case DeparturePhase.AIRBORNE:
            if (strip.depPosition === DeparturePosition.ND)
              stripsCue.airborneNorthPanel.push(newStrip);
            if (strip.depPosition === DeparturePosition.SD)
              stripsCue.airborneSouthPanel.push(newStrip);
            break;
          case DeparturePhase.SATELLITE_PENDING:
            stripsCue.satellitePendingPanel.push(newStrip);
            break;
        }
      });
      const lastAirborneNorth = _.findLast(
        stripsCue.airborneNorthPanel,
        (strip) => {
          return !strip.isSatellite;
        }
      );
      const lastAirborneSouth = _.findLast(
        stripsCue.airborneSouthPanel,
        (strip) => {
          return !strip.isSatellite;
        }
      );

      let northStrips: DepFDE[] = [];
      let southStrips: DepFDE[] = [];

      if (lastAirborneNorth) {
        northStrips = [
          lastAirborneNorth,
          ...stripsCue.inPositionNorthPanel,
          ...stripsCue.readyNorthPanel,
        ];
      } else {
        northStrips = [
          ...stripsCue.inPositionNorthPanel,
          ...stripsCue.readyNorthPanel,
        ];
      }

      if (lastAirborneSouth) {
        southStrips = [
          lastAirborneSouth,
          ...stripsCue.inPositionSouthPanel,
          ...stripsCue.readySouthPanel,
        ];
      } else {
        southStrips = [
          ...stripsCue.inPositionSouthPanel,
          ...stripsCue.readySouthPanel,
        ];
      }

      if (!simOptions.allowVdp) {
        northStrips.forEach((strip) => {
          if (strip.depPhase !== DeparturePhase.AIRBORNE) {
            strip.isVDP = false;
          }
        });
        southStrips.forEach((strip) => {
          if (strip.depPhase !== DeparturePhase.AIRBORNE) {
            strip.isVDP = false;
          }
        });
      }

      if (simOptions.allowVdp) {
        northStrips.forEach((strip, idx) => {
          if (strip.isSatellite) return;

          if (
            strip.depPhase === DeparturePhase.AIRBORNE &&
            strip.isVDP === true
          ) {
            return;
          }

          const prevStrip = northStrips[idx - 1];
          if (
            !prevStrip ||
            prevStrip.acType === AcType.PROP ||
            strip.acType === AcType.PROP
          ) {
            strip.isVDP = false;
            return;
          }

          if (determineIfVdpAllowed(simOptions.radarScene, strip, prevStrip)) {
            strip.isVDP = true;
            return;
          } else {
            strip.isVDP = false;
          }
        });
        southStrips.forEach((strip, idx) => {
          if (strip.isSatellite) return;

          if (
            strip.depPhase === DeparturePhase.AIRBORNE &&
            strip.isVDP === true
          ) {
            return;
          }

          const prevStrip = southStrips[idx - 1];
          if (
            !prevStrip ||
            prevStrip.acType === AcType.PROP ||
            strip.acType === AcType.PROP
          ) {
            strip.isVDP = false;
            return;
          }

          if (determineIfVdpAllowed(simOptions.radarScene, strip, prevStrip)) {
            strip.isVDP = true;
            return;
          } else {
            strip.isVDP = false;
          }
        });
      }

      setStripList(stripsCue);
    },
    [simOptions.allowVdp, simOptions.radarScene]
  );

  useEffect(() => {
    processStrips(strips);
  }, [strips, processStrips]);

  // Interval: Add new Dep strip
  useRandomInterval(
    () => {
      if (simOptions.isPaused) return;

      if (
        stripList.readyNorthPanel.length < 3 ||
        stripList.readySouthPanel.length < 3
      ) {
        dispatch(
          departureListActions.addDepStrip({
            radarScene: simOptions.radarScene,
            isSingleOps: simOptions.isSingleOps,
            prevFdeSidName: strips[strips.length - 1].sidName,
          })
        );
      }
    },
    simOptions.newStripInterval[0] / simOptions.gameSpeedMultiplier,
    simOptions.newStripInterval[1] / simOptions.gameSpeedMultiplier
  );

  // Interval: Add new Satellite strip
  useRandomInterval(
    () => {
      if (simOptions.isPaused) return;

      if (stripList.satellitePendingPanel.length < 2) {
        dispatch(departureListActions.addSatStrip(simOptions.radarScene));
      }
    },
    (simOptions.intervalBetweenSatelliteDeps * 0.25) /
      simOptions.gameSpeedMultiplier,
    (simOptions.intervalBetweenSatelliteDeps * 0.5) /
      simOptions.gameSpeedMultiplier
  );

  // Interval: Move from panels READY N/S -> IN POSITION N/S
  useRandomInterval(
    () => {
      if (simOptions.isPaused) return;

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
    updateInterval,
    updateInterval * 4
  );
  useRandomInterval(
    () => {
      if (simOptions.isPaused) return;

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
    updateInterval,
    updateInterval * 4
  );

  // Interval: (NORMAL) Move from panel IN POSITION -> AIRBORNE
  useInterval(() => {
    if (simOptions.isPaused) return;

    const currTime = Date.now();
    const currInPositionNFde = stripList.inPositionNorthPanel[0];
    const currInPositionSFde = stripList.inPositionSouthPanel[0];

    if (currInPositionNFde) {
      if (
        currTime >
        currInPositionNFde.inPositionTime +
          simOptions.intervalBetweenNormalDeps / simOptions.gameSpeedMultiplier
      ) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionNorthPanel[0])
        );
      }
    }
    if (currInPositionSFde) {
      if (
        currTime >
        currInPositionSFde.inPositionTime +
          simOptions.intervalBetweenNormalDeps / simOptions.gameSpeedMultiplier
      ) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionSouthPanel[0])
        );
      }
    }
  }, updateInterval);

  // Interval: (VISUAL DEPS) Move from panel IN POSITION -> AIRBORNE
  useInterval(() => {
    if (simOptions.isPaused || !simOptions.allowVdp) return;

    const currTime = Date.now();
    const currInPositionNFde = stripList.inPositionNorthPanel[0];
    const currInPositionSFde = stripList.inPositionSouthPanel[0];

    if (currInPositionNFde && currInPositionNFde.isVDP) {
      if (
        currTime >
        currInPositionNFde.inPositionTime +
          simOptions.intervalBetweenVisualDeps / simOptions.gameSpeedMultiplier
      ) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionNorthPanel[0])
        );
      }
    }
    if (currInPositionSFde && currInPositionSFde.isVDP) {
      if (
        currTime >
        currInPositionSFde.inPositionTime +
          simOptions.intervalBetweenVisualDeps / simOptions.gameSpeedMultiplier
      ) {
        dispatch(
          departureListActions.setToAirborne(stripList.inPositionSouthPanel[0])
        );
      }
    }
  }, updateInterval);

  // Interval: Move from panel SATELLITE PENDING -> AIRBORNE
  useInterval(() => {
    if (simOptions.isPaused) return;

    const currTime = Date.now();
    const currSatPendingFde = stripList.satellitePendingPanel[0];

    if (currSatPendingFde) {
      if (
        currTime >
        timeOfLastAirborneSatellite +
          simOptions.intervalBetweenSatelliteDeps /
            simOptions.gameSpeedMultiplier
      ) {
        dispatch(departureListActions.setToAirborne(currSatPendingFde));
        setTimeOfLastAirborneSatellite(Date.now());
      }
    }
  }, updateInterval);

  return (
    <main className={styles.DepFdeSection}>
      <section className={styles.NorthDepCol}>
        <DepStripPanel
          title={DepStripPanelName.READY_N}
          height={Size.SM}
          depPosition={DeparturePosition.ND}
          strips={stripList.readyNorthPanel}
        />
        <DepStripPanel
          title={DepStripPanelName.IN_POSITION_N}
          height={Size.SM}
          depPosition={DeparturePosition.ND}
          strips={stripList.inPositionNorthPanel}
        />
        <DepStripPanel
          title={DepStripPanelName.AIRBORNE_N}
          height={Size.LG}
          depPosition={DeparturePosition.ND}
          strips={stripList.airborneNorthPanel}
        />
        <DepStripPanel
          title={DepStripPanelName.SATELLITE_PENDING}
          height={Size.MD}
          depPosition={DeparturePosition.SD}
          strips={stripList.satellitePendingPanel}
        />
      </section>
      <section className={styles.SouthDepCol}>
        <DepStripPanel
          title={DepStripPanelName.READY_S}
          height={Size.SM}
          depPosition={DeparturePosition.SD}
          strips={stripList.readySouthPanel}
        />
        <DepStripPanel
          title={DepStripPanelName.IN_POSITION_S}
          height={Size.SM}
          depPosition={DeparturePosition.SD}
          strips={stripList.inPositionSouthPanel}
        />
        <DepStripPanel
          title={DepStripPanelName.AIRBORNE_S}
          height={Size.LG}
          depPosition={DeparturePosition.SD}
          strips={stripList.airborneSouthPanel}
        />
      </section>
    </main>
  );
};

export default DepFdeSection;
