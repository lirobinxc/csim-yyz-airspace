import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../images/up-arrow.png';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

import styles from './DepartureFDE.module.scss';
import { departureListActions } from '../../state/slices/departureListSlice';
import { DepFDE } from '../../functions/genDepFdeData';
import { SatelliteData } from '../../data/satelliteCollection';
import useInterval from 'use-interval';
import { AcType } from '../../../phaser/types/AircraftTypes';
import {
  selectSimOptions,
  simOptions,
  simOptionsActions,
} from '../../state/slices/simOptionsSlice';

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
  const [currentAlt, setCurrentAlt] = useState(assignedAlt);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [stripIsSelected, setStripIsSelected] = useState(false);
  const [isCommSwitched, setIsCommSwitched] = useState(false);

  const isJetFpBelow230 = acType === AcType.JET && filedAlt < 230;

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

  function deleteStrip() {
    dispatch(departureListActions.deleteStrip(acId.code));
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
    if (simOptions.selectedStrip?.uniqueKey === uniqueKey) {
      setStripIsSelected(true);
    } else {
      setStripIsSelected(false);
    }
  }, [simOptions, uniqueKey]);

  function handleAcIdClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();

    if (!stripIsSelected && simOptions.selectedStrip) {
      dispatch(
        departureListActions.insertStripBelow({
          firstStrip: simOptions.selectedStrip,
          secondStrip: props,
        })
      );
      dispatch(simOptionsActions.removeSelectedStrip());
      return;
    }

    if (stripIsSelected) {
      dispatch(simOptionsActions.removeSelectedStrip());
    } else {
      dispatch(simOptionsActions.setSelectedStrip(props));
    }
  }

  useInterval(() => {
    setIsCommSwitched(true);
  }, 8000);

  const departureRunwayFormatted = depRunway?.split(' ')[2];

  return (
    <section
      className={clsx(styles.FlightStrip, styles.flexCol, {
        [styles.borderYellow]:
          simOptions.selectedStrip?.uniqueKey === uniqueKey,
      })}
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
