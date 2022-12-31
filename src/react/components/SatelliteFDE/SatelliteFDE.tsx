import React, { useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';
import { useAppDispatch } from '../../state/hooks';

import styles from './SatelliteFDE.module.scss';
import { departureListActions } from '../../state/slices/departureListSlice';
import { AcType } from '../../functions/genACID';
import { SatFDE } from '../../functions/genSatFdeData';

function SatelliteFDE({
  acFullName,
  acId,
  acType,
  assignedAlt,
  assignedHeading,
  coordinatedAlt,
  debugACID,
  departurePoint,
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
  yyzRunwayId,
}: SatFDE) {
  const dispatch = useAppDispatch();

  const [currentAlt, setCurrentAlt] = useState(assignedAlt);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);

  const satType = satFdeData.SatType;
  const isArrival = satType === 'Arrival';
  const isDeparture = satType === 'Departure';
  const isOverflight = satType === 'Overflight';

  const isYhmArrival = isArrival && satFdeData.Destination === 'CYHM';
  const isYpqOrYooArrival =
    (isArrival && satFdeData.Destination === 'CYPQ') ||
    satFdeData.Destination === 'CYOO';

  const hasExitAltitude = satFdeData.ExitAltitude !== '';

  function isCorrectHandoffAlt() {
    if (!hasExitAltitude) return false;

    if (filedAlt < Number(satFdeData.ExitAltitude)) {
      return currentAlt === filedAlt;
    }
    return currentAlt === Number(satFdeData.ExitAltitude);
  }

  function increaseAlt() {
    if (currentAlt % 10 === 5) {
      setCurrentAlt(currentAlt + 5);
      return;
    }

    setCurrentAlt(currentAlt + 10);
  }

  function decreaseAlt() {
    if (currentAlt <= 0) return;

    if (currentAlt % 10 === 5) {
      setCurrentAlt(currentAlt - 5);
    }

    setCurrentAlt(currentAlt - 10);
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

  function removeStrip() {
    // dispatch(readyPanelActions.deleteStrip(acId));
  }

  function displayAssignedHeading() {
    if (onCourse) return satFdeData.ExitHeading;
    if (assignedHeading === 'No turns') return '';
    return assignedHeading;
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
          [styles.borderRight]: !isYpqOrYooArrival,
        })}
      >
        <div className={clsx(styles.acId)}>{acId}</div>
      </div>
    );
  }

  function displayRunwayBox() {
    return (
      <div
        className={clsx(styles.col8, {
          [styles.bgCorrectAlt]: isCorrectHandoffAlt(),
          [styles.borderRight]: isYpqOrYooArrival,
        })}
        onClick={removeStrip}
      >
        <div className={clsx(styles.runwayId)}>{satFdeData.SatRunway}</div>
      </div>
    );
  }

  return (
    <section
      className={clsx(styles.FlightStrip, styles.flexCol, {
        [styles.bgGreen]: isYpqOrYooArrival,
      })}
    >
      <div className={clsx(styles.topRow, styles.flexRow)}>
        {isYpqOrYooArrival ? displayRunwayBox() : displayAcidBox()}
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
                    setCurrentAlt(assignedAlt);
                    closeModal();
                  }}
                >
                  Reset
                </button>
              </div>
              <div className={styles.row2}>
                <button
                  onClick={() => {
                    setCurrentAlt(50);
                    closeModal();
                  }}
                >
                  50
                </button>
                <button
                  onClick={() => {
                    setCurrentAlt(60);
                    closeModal();
                  }}
                >
                  60
                </button>
                <button
                  onClick={() => {
                    setCurrentAlt(70);
                    closeModal();
                  }}
                >
                  70
                </button>
                <button
                  onClick={() => {
                    setCurrentAlt(130);
                    closeModal();
                  }}
                >
                  130
                </button>
              </div>
              <div className={styles.row2}>
                <button
                  onClick={() => {
                    setCurrentAlt(80);
                    closeModal();
                  }}
                >
                  80
                </button>
                <button
                  onClick={() => {
                    setCurrentAlt(90);
                    closeModal();
                  }}
                >
                  90
                </button>
                <button
                  onClick={() => {
                    setCurrentAlt(150);
                    closeModal();
                  }}
                >
                  150
                </button>
                <button
                  onClick={() => {
                    setCurrentAlt(230);
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
              [styles.colorRed]: isYhmArrival && currentAlt === 160,
            })}
            onClick={openModal}
          >
            {currentAlt === 0 ? '' : currentAlt}
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
        {isYpqOrYooArrival ? displayAcidBox() : displayRunwayBox()}
      </div>
      <div className={clsx(styles.bottomRow, styles.flexRow)}>
        <div className={clsx(styles.col1, { [styles.bgWhite]: isQ400 })}>
          <div className={clsx(styles.acType)}>{acFullName}</div>
        </div>
        <div className={clsx(styles.col3)}>
          <div className={clsx(styles.departurePoint)}>{departurePoint}</div>
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
              colorRed: acType === AcType.Jet && filedAlt < 230,
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
