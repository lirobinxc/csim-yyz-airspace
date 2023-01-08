import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

import styles from './SatelliteFDE.module.scss';
import { departureListActions } from '../../state/slices/departureListSlice';
import { AcType } from '../../../phaser/types/AircraftTypes';
import { DepFDE } from '../../functions/genDepFdeData';
import {
  selectSimOptions,
  simOptionsActions,
} from '../../state/slices/simOptionsSlice';

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

  const [currentAlt, setCurrentAlt] = useState(assignedAlt);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [stripIsSelected, setStripIsSelected] = useState(false);

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

  function deleteStrip() {
    dispatch(departureListActions.deleteStrip(acId.code));
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
          simOptions.selectedStrip?.uniqueKey === uniqueKey,
      })}
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
