import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../../images/up-arrow.png';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';

import styles from './DepartureFDE.module.scss';
import { departureListActions } from '../../../state/slices/departureListSlice';
import { DepFDE } from '../../../functions/departure/genDepFDE';
import useInterval from 'use-interval';
import { AcType } from '../../../../engine/types/AircraftTypes';
import {
  selectSimOptions,
  simOptionsActions,
} from '../../../state/slices/simOptionsSlice';
import { PlaneCommandCue } from '../../../../engine/objects/Plane/PlaneCommandMenu';
import { OtherSceneKeys } from '../../../../engine/types/SceneKeys';
import RadarScene from '../../../../engine/scenes/RadarScene';
import { ReactCustomEvents } from '../../../../engine/types/CustomEvents';
import Engine from '../../../../engine/EngineConfig';

function DepartureFDE(props: DepFDE) {
  const {
    acModelFull,
    acId,
    acType,
    assignedAlt,
    assignedHeading,
    coordinatedAlt,
    destination,
    ETA,
    filedAlt,
    filedRoute,
    handoffAlt,
    isNADP1 = false,
    isQ400 = false,
    onCourseWP,
    remarks,
    transponderCode,
    isVDP,
    depRunway,
    uniqueKey,
  } = props;

  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [stripIsSelected, setStripIsSelected] = useState(false);
  const [isCommSwitched, setIsCommSwitched] = useState(false);

  const [fdeAltitude, setFdeAltitude] = useState(assignedAlt);
  const [fdeHeading, setFdeHeading] = useState<number | null>(null);
  const [fdeSpeed, setFdeSpeed] = useState<number | null>(null);
  const [apprClr, setApprClr] = useState(false);
  const [interceptLoc, setInterceptLoc] = useState(false);
  const [prevCommandCue, setPrevCommandCue] = useState<PlaneCommandCue>({
    directTo: null,
    heading: fdeHeading,
    altitude: assignedAlt,
    speed: null,
    interceptLoc: false,
    approachClearance: false,
  });

  const isJetFpBelow230 = acType === AcType.JET && filedAlt < 230;

  function isCorrectHandoffAlt() {
    if (filedAlt < Number(handoffAlt)) {
      return fdeAltitude === filedAlt;
    }
    return fdeAltitude === Number(handoffAlt);
  }

  function handleClickAlt() {
    setFdeAltitude(fdeAltitude + 10);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function handleOnCourse() {
    setOnCourse(true);
  }

  function deleteStrip() {
    dispatch(departureListActions.deleteStrip(props));
  }

  function displayAssignedHeading() {
    if (onCourse) return onCourseWP;
    if (!assignedHeading) return '';
    if (typeof assignedHeading === 'number') {
      return assignedHeading.toString().padStart(3, '0');
    }
  }

  //TEMP
  useEffect(() => {
    if (simOptions.selectedDepStrip?.uniqueKey === uniqueKey) {
      setStripIsSelected(true);
    } else {
      setStripIsSelected(false);
    }
  }, [simOptions, uniqueKey]);

  function handleAcIdClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();

    if (!stripIsSelected && simOptions.selectedDepStrip) {
      dispatch(
        departureListActions.insertStripBelow({
          firstStrip: simOptions.selectedDepStrip,
          secondStrip: props,
        })
      );
      dispatch(simOptionsActions.removeSelectedDepStrip());
      return;
    }

    if (stripIsSelected) {
      dispatch(simOptionsActions.removeSelectedDepStrip());
    } else {
      dispatch(simOptionsActions.setSelectedDepStrip(props));
    }
  }

  useInterval(() => {
    setIsCommSwitched(true);
  }, 8000);

  const departureRunwayFormatted = depRunway?.split(' ')[2];

  function sendCommandCue() {
    const newCommandCue: PlaneCommandCue = {
      directTo: null,
      heading: fdeHeading,
      altitude: fdeAltitude,
      speed: fdeSpeed,
      interceptLoc: interceptLoc,
      approachClearance: apprClr,
    };

    const SENT_COMMAND_CUE: PlaneCommandCue = {
      directTo: null,
      heading: null,
      altitude: null,
      speed: null,
      interceptLoc: interceptLoc,
      approachClearance: apprClr,
    };

    if (prevCommandCue.heading !== fdeHeading) {
      SENT_COMMAND_CUE.heading = fdeHeading;
    }
    if (prevCommandCue.altitude !== fdeAltitude) {
      SENT_COMMAND_CUE.altitude = fdeAltitude * 100;

      if (fdeAltitude === 0) {
        SENT_COMMAND_CUE.interceptLoc = true;
        SENT_COMMAND_CUE.approachClearance = true;
        setInterceptLoc(true);
        setApprClr(true);
      }
    }
    if (prevCommandCue.speed !== fdeSpeed && fdeSpeed !== 0) {
      SENT_COMMAND_CUE.speed = fdeSpeed;
    }

    setPrevCommandCue(newCommandCue);

    const RADAR_SCENE = Engine.scene.keys[
      OtherSceneKeys.RADAR_BASE
    ] as RadarScene;
    RADAR_SCENE.events.emit(
      ReactCustomEvents.FDE_COMMAND_CUE,
      uniqueKey,
      SENT_COMMAND_CUE
    );
  }

  return (
    <section
      className={clsx(styles.FlightStrip, styles.flexCol, {
        [styles.borderYellow]:
          simOptions.selectedDepStrip?.uniqueKey === uniqueKey,
      })}
      onContextMenu={sendCommandCue}
    >
      <div className={clsx(styles.topRow, styles.flexRow)}>
        <div
          className={clsx(styles.col1, { [styles.bgYellow]: isVDP })}
          onClick={handleAcIdClick}
        >
          <div className={clsx(styles.acId)}>{acId.code}</div>
        </div>
        <div className={clsx(styles.col2)}>
          <div className={clsx(styles.ETA)}>{ETA}Z</div>
          <div className={clsx(styles.transponderCode)}>{transponderCode}</div>
        </div>
        <div className={clsx(styles.col3)} onClick={handleClickAlt}>
          <img src={upArrow} className={styles.arrowPng} alt="upArrow" />
        </div>
        <div className={clsx(styles.col4)}>
          <aside
            className={clsx(styles.altModalWrapper, {
              [styles.displayNone]: !isModalOpen,
            })}
          >
            <div className={clsx(styles.altModalContent)}>
              <div className={styles.row1}>
                <button
                  onClick={() => {
                    setFdeAltitude(assignedAlt);
                    closeModal();
                  }}
                >
                  Reset
                </button>
              </div>
              <div className={styles.row2}>
                <button
                  onClick={() => {
                    setFdeAltitude(50);
                    closeModal();
                  }}
                >
                  50
                </button>
                <button
                  onClick={() => {
                    setFdeAltitude(60);
                    closeModal();
                  }}
                >
                  60
                </button>
                <button
                  onClick={() => {
                    setFdeAltitude(70);
                    closeModal();
                  }}
                >
                  70
                </button>
                <button
                  onClick={() => {
                    setFdeAltitude(200);
                    closeModal();
                  }}
                >
                  200
                </button>
              </div>
              <div className={styles.row2}>
                <button
                  onClick={() => {
                    setFdeAltitude(80);
                    closeModal();
                  }}
                >
                  80
                </button>
                <button
                  onClick={() => {
                    setFdeAltitude(90);
                    closeModal();
                  }}
                >
                  90
                </button>
                <button
                  onClick={() => {
                    setFdeAltitude(150);
                    closeModal();
                  }}
                >
                  150
                </button>
                <button
                  onClick={() => {
                    setFdeAltitude(230);
                    closeModal();
                  }}
                >
                  230
                </button>
              </div>
            </div>
            <div
              className={clsx(styles.altModalOverlay)}
              onClick={closeModal}
            ></div>
          </aside>
          <div className={clsx(styles.assignedAlt)} onClick={openModal}>
            {fdeAltitude}
          </div>
        </div>
        <div className={clsx(styles.col5)}>
          <div className={clsx(styles.remarks)}>{remarks}</div>
        </div>
        <div className={clsx(styles.col6)} onClick={handleOnCourse}>
          <div
            className={clsx(styles.assignedHeading, {
              [styles.colorRed]: !onCourse,
            })}
          >
            {displayAssignedHeading()}
          </div>
        </div>
        <div className={clsx(styles.col7)}>
          <div className={clsx(styles.isNADP1)}>{isNADP1 && 1}</div>
        </div>
        <div
          className={clsx(styles.col8, {
            [styles.bgGreen]: isCorrectHandoffAlt(),
          })}
          onClick={deleteStrip}
        >
          <div className={clsx(styles.runwayId)} onClick={deleteStrip}>
            {departureRunwayFormatted}
          </div>
        </div>
      </div>
      <div className={clsx(styles.bottomRow, styles.flexRow)}>
        <div className={clsx(styles.col1, { [styles.bgWhite]: isQ400 })}>
          <div className={clsx(styles.acType)}>{acModelFull}</div>
        </div>
        <div className={clsx(styles.col2)}>
          <div
            className={clsx(styles.filedAlt, {
              [styles.colorRed]: isJetFpBelow230,
            })}
          >
            {filedAlt}
          </div>
        </div>
        <div
          className={clsx(styles.col3, { [styles.bgYellow]: !isCommSwitched })}
        ></div>
        <div className={clsx(styles.col4)}>
          <div className={clsx(styles.filedRoute)}>{filedRoute}</div>
        </div>
        <div className={clsx(styles.col5)}>
          <div className={clsx(styles.destination)}>{destination}</div>
        </div>
        <div className={clsx(styles.col6)}>
          <div className={clsx(styles.coordinatedAlt)}>
            {coordinatedAlt !== 0 && coordinatedAlt}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DepartureFDE;
