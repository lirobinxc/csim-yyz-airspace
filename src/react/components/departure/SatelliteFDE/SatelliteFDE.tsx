import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../../images/up-arrow.png';
import downArrow from '../../../images/down-arrow.png';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';

import styles from './SatelliteFDE.module.scss';
import { departureListActions } from '../../../state/slices/departureListSlice';
import { AcType } from '../../../../engine/types/AircraftTypes';
import { DepFDE } from '../../../functions/departure/genDepFDE';
import {
  selectSimOptions,
  simOptionsActions,
} from '../../../state/slices/simOptionsSlice';
import { PlaneCommandCue } from '../../../../engine/objects/Plane/PlaneCommandMenu';
import PhaserGame from '../../../../engine/PhaserGameConfig';
import { OtherSceneKeys } from '../../../../engine/types/SceneKeys';
import RadarScene from '../../../../engine/scenes/RadarScene';
import { ReactCustomEvents } from '../../../../engine/types/CustomEvents';

function SatelliteFDE(props: DepFDE) {
  const {
    acModelFull,
    acId,
    acType,
    assignedAlt,
    assignedHeading,
    coordinatedAlt,
    debugACID,
    depPoint,
    depRunway,
    destination,
    ETA,
    filedAlt,
    filedRoute,
    filedTAS,
    handoffAlt,
    isNADP1,
    isQ400,
    isSatellite,
    onCourseWP,
    remarks = '',
    satFdeData,
    transponderCode,
    uniqueKey,
  } = props;

  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [stripIsSelected, setStripIsSelected] = useState(false);

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

  const satName = satFdeData.name;
  const satType = satFdeData.name.split('_')[1];
  const isArrival = satType === 'ARR';
  const isDeparture = satType === 'ARR';
  // const isOverflight = satType === 'Overflight';

  const isYhmArrival = isArrival && satFdeData.destination === 'CYHM';
  const isYpqOrYooArrival =
    (isArrival && satFdeData.destination === 'CYPQ') ||
    satFdeData.destination === 'CYOO';
  const isYzdDep = satFdeData.depPoint === 'CYZD';

  function increaseAlt() {
    if (fdeAltitude % 10 === 5) {
      setFdeAltitude(fdeAltitude + 5);
      return;
    }

    setFdeAltitude(fdeAltitude + 10);
  }

  function decreaseAlt() {
    if (fdeAltitude <= 0) return;

    if (fdeAltitude % 10 === 5) {
      setFdeAltitude(fdeAltitude - 5);
    }

    setFdeAltitude(fdeAltitude - 10);
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

    const RADAR_SCENE = PhaserGame.scene.keys[
      OtherSceneKeys.RADAR_BASE
    ] as RadarScene;
    RADAR_SCENE.events.emit(
      ReactCustomEvents.FDE_COMMAND_CUE,
      uniqueKey,
      SENT_COMMAND_CUE
    );
  }

  function displayAssignedHeading() {
    // if (onCourse) return satFdeData.exitHeading;
    if (!assignedHeading) return '';
    if (typeof assignedHeading === 'number') {
      return assignedHeading.toString().padStart(3, '0');
    }
  }

  function displayArrows() {
    if (isArrival)
      return (
        <>
          <div className={clsx(styles.arrivalArrows)} onClick={increaseAlt}>
            <img src={upArrow} className={styles.upArrow} alt="upArrow" />{' '}
          </div>
          <div className={clsx(styles.arrivalArrows)} onClick={decreaseAlt}>
            <img src={downArrow} className={styles.downArrow} alt="downArrow" />
          </div>
        </>
      );

    return (
      <div className={clsx(styles.departureArrows)} onClick={increaseAlt}>
        <img src={upArrow} className={styles.upArrow} alt="upArrow" />
      </div>
    );
  }

  function displayAcidBox() {
    return (
      <div
        className={clsx(styles.col1, {
          [styles.borderRight]: !isYpqOrYooArrival && !isYzdDep,
        })}
        onClick={handleAcIdClick}
      >
        <div className={clsx(styles.acId)}>{acId.code}</div>
      </div>
    );
  }

  const departureRunwayFormatted = depRunway?.split(' ')[2];
  function displayRunwayBox() {
    return (
      <div
        className={clsx(styles.col8, {
          [styles.borderRight]: isYpqOrYooArrival && isYzdDep,
        })}
        onClick={deleteStrip}
      >
        <div className={clsx(styles.runwayId)}>{departureRunwayFormatted}</div>
      </div>
    );
  }

  return (
    <section
      className={clsx(styles.FlightStrip, styles.flexCol, {
        [styles.bgSatelliteGreen]: isYpqOrYooArrival && isYzdDep,
        [styles.borderYellow]:
          simOptions.selectedDepStrip?.uniqueKey === uniqueKey,
      })}
      onContextMenu={sendCommandCue}
    >
      <div className={clsx(styles.topRow, styles.flexRow)}>
        {isYpqOrYooArrival && isYzdDep ? displayRunwayBox() : displayAcidBox()}
        <div className={clsx(styles.col2)}>
          <div className={clsx(styles.ETA)}>{ETA}Z</div>
          <div className={clsx(styles.transponderCode)}>{transponderCode}</div>
        </div>
        <div className={clsx(styles.col3)}>{displayArrows()}</div>
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
                    setFdeAltitude(130);
                    closeModal();
                  }}
                >
                  130
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
          <div
            className={clsx(styles.assignedAlt, {
              [styles.colorRed]: isYhmArrival && fdeAltitude === 160,
            })}
            onClick={openModal}
          >
            {fdeAltitude === 0 ? '' : fdeAltitude}
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
        {isYpqOrYooArrival && isYzdDep ? displayAcidBox() : displayRunwayBox()}
      </div>
      <div className={clsx(styles.bottomRow, styles.flexRow)}>
        <div className={clsx(styles.col1, { [styles.bgWhite]: isQ400 })}>
          <div className={clsx(styles.acType)}>{acModelFull}</div>
        </div>
        <div className={clsx(styles.col3)}>
          <div className={clsx(styles.departurePoint)}>{depPoint}</div>
        </div>
        <div className={clsx(styles.col4)}>
          <div className={clsx(styles.filedRoute)}>{filedRoute}</div>
        </div>
        <div className={clsx(styles.col5)}>
          <div className={clsx(styles.destination)}>{destination}</div>
        </div>
        <div className={clsx(styles.col2)}>
          <div
            className={clsx(styles.filedAlt, {
              colorRed: acType === AcType.JET && filedAlt < 230,
            })}
          >
            {filedAlt}
          </div>
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

export default SatelliteFDE;
