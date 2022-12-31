import React, { useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../images/up-arrow.png';
import { useAppDispatch } from '../../state/hooks';

import styles from './DepartureFDE.module.scss';
import { airborneListActions } from '../../state/slices/airborneSlice';
import { AcType } from '../../functions/genACID';
import { DepFDE } from '../../functions/genDepFdeData';
import { SatelliteData } from '../../data/satelliteCollection';
import useInterval from 'use-interval';

// interface DepartureFDEProps {
//   acFullName: string;
//   acId: string;
//   acType: string;
//   assignedAlt: number;
//   assignedHeading: string;
//   coordinatedAlt?: number;
//   departurePoint?: string;
//   destination: string;
//   ETA: string;
//   filedAlt: number;
//   filedRoute: string;
//   isNADP1?: boolean;
//   isQ400?: boolean;
//   onCourseWP: string;
//   remarks?: string;
//   yyzRunwayId: string;
//   transponderCode: string;
// }

function DepartureFDE({
  acFullName,
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
  yyzRunwayId,
  isVDP,
}: DepFDE) {
  const dispatch = useAppDispatch();

  const [currentAlt, setCurrentAlt] = useState(assignedAlt);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [isAirborne, setIsAirborne] = useState(false);

  function isCorrectHandoffAlt() {
    if (filedAlt < Number(handoffAlt)) {
      return currentAlt === filedAlt;
    }
    return currentAlt === Number(handoffAlt);
  }

  function handleClickAlt() {
    setCurrentAlt(currentAlt + 10);
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
    dispatch(airborneListActions.deleteStrip(acId));
  }

  function displayAssignedHeading() {
    if (onCourse) return onCourseWP;
    if (assignedHeading === 'No turns') return '';
    return assignedHeading;
  }

  useInterval(() => {
    setIsAirborne(true);
  }, 8000);

  return (
    <section className={clsx(styles.FlightStrip, styles.flexCol)}>
      <div className={clsx(styles.topRow, styles.flexRow)}>
        <div className={clsx(styles.col1, { [styles.bgYellow]: isVDP })}>
          <div className={clsx(styles.acId)}>{acId}</div>
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
                    setCurrentAlt(200);
                    closeModal();
                  }}
                >
                  200
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
          <div className={clsx(styles.assignedAlt)} onClick={openModal}>
            {currentAlt}
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
          onClick={removeStrip}
        >
          <div className={clsx(styles.runwayId)}>{yyzRunwayId}</div>
        </div>
      </div>
      <div className={clsx(styles.bottomRow, styles.flexRow)}>
        <div className={clsx(styles.col1, { [styles.bgWhite]: isQ400 })}>
          <div className={clsx(styles.acType)}>{acFullName}</div>
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
        <div
          className={clsx(styles.col3, { [styles.bgYellow]: !isAirborne })}
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
