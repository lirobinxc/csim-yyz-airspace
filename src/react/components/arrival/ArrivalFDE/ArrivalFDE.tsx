import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import downArrow from '../../../images/down-arrow.png';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import styles from './ArrivalFDE.module.scss';
import {
  selectSimOptions,
  simOptionsActions,
} from '../../../state/slices/simOptionsSlice';
import { ArrFDE } from '../../../functions/arrival/genArrFDE';
import { arrivalListActions } from '../../../state/slices/arrivalListSlice';

function ArrivalFDE(props: ArrFDE) {
  const {
    uniqueKey,
    acId,
    acModel,
    acModelFull,
    acType,
    acWtc,
    arrPhase,
    arrPosition,
    arrRunway,
    assignedAlt,
    assignedSpeed,
    assignedHeading,
    debugACID,
    ETA,
    isQ400,
    starName,
    transponderCode,
  } = props;

  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);
  const [currentAlt, setCurrentAlt] = useState(assignedAlt);
  const [currentSpeed, setCurrentSpeed] = useState(assignedSpeed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [stripIsSelected, setStripIsSelected] = useState(false);
  const [isCommSwitched, setIsCommSwitched] = useState(false);

  function handleClickAlt() {
    if (currentAlt - 10 < 30) {
      setCurrentAlt(0);
      return;
    }

    setCurrentAlt(currentAlt - 10);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function deleteStrip() {
    dispatch(arrivalListActions.deleteStrip(props));
  }

  // TEMP
  useEffect(() => {
    if (simOptions.selectedArrStrip?.uniqueKey === uniqueKey) {
      setStripIsSelected(true);
    } else {
      setStripIsSelected(false);
    }
  }, [simOptions, uniqueKey]);

  function handleAcIdClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();

    if (!stripIsSelected && simOptions.selectedArrStrip) {
      dispatch(
        arrivalListActions.insertStripBelow({
          firstStrip: simOptions.selectedArrStrip,
          secondStrip: props,
        })
      );
      dispatch(simOptionsActions.removeSelectedArrStrip());
      return;
    }

    if (stripIsSelected) {
      dispatch(simOptionsActions.removeSelectedArrStrip());
    } else {
      dispatch(simOptionsActions.setSelectedArrStrip(props));
    }
  }

  const arrRunwayFormatted = arrRunway.split(' ')[2];

  return (
    <section className={clsx(styles.ArrivalStrip, styles.flexRow)}>
      <div
        className={clsx(styles.col1, {
          [styles.bgGreen]:
            simOptions.selectedArrStrip?.uniqueKey === uniqueKey,
        })}
        onClick={handleAcIdClick}
      >
        <div className={clsx(styles.acId)}>{acId.code}</div>
      </div>
      <div className={clsx(styles.col2)}>
        <div className={clsx(styles.topBox)}>
          <div className={clsx(styles.acModelFull)}>{acModelFull}</div>
          <div className={clsx(styles.recat)}>D</div>
        </div>
        <div className={clsx(styles.bottomBox)}>emptyBox</div>
      </div>
      <div className={clsx(styles.col3)} onClick={handleClickAlt}>
        <img src={downArrow} className={styles.arrowPng} alt="downArrow" />
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
                  setCurrentAlt(110);
                  closeModal();
                }}
              >
                110
              </button>
              <button
                onClick={() => {
                  setCurrentAlt(100);
                  closeModal();
                }}
              >
                100
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
                  setCurrentAlt(80);
                  closeModal();
                }}
              >
                80
              </button>
              <button
                onClick={() => {
                  setCurrentAlt(70);
                  closeModal();
                }}
              >
                70
              </button>
            </div>
            <div className={styles.row2}>
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
                  setCurrentAlt(50);
                  closeModal();
                }}
              >
                50
              </button>
              <button
                onClick={() => {
                  setCurrentAlt(40);
                  closeModal();
                }}
              >
                40
              </button>
              <button
                onClick={() => {
                  setCurrentAlt(30);
                  closeModal();
                }}
              >
                30
              </button>
              <button
                onClick={() => {
                  setCurrentAlt(0);
                  closeModal();
                }}
              >
                A
              </button>
            </div>
          </div>
          <div
            className={clsx(styles.altModalOverlay)}
            onClick={closeModal}
          ></div>
        </aside>
        <div className={clsx(styles.assignedAlt)} onClick={openModal}>
          {currentAlt >= 30 ? currentAlt : 'A'}
        </div>
      </div>
      <div className={clsx(styles.col5)}>
        <div className={clsx(styles.assignedSpeed)}>
          {currentSpeed === assignedSpeed ? 'RNAV' : currentSpeed}
        </div>
      </div>
      <div className={clsx(styles.col6)}></div>
      <div className={clsx(styles.col7)}>
        <div className={clsx(styles.topBox)}>
          <div className={clsx(styles.transponderCode)}>{transponderCode}</div>
        </div>
        <div className={clsx(styles.bottomBox)}>
          <div className={clsx(styles.starName)}>{starName}</div>
        </div>
      </div>
      <div className={clsx(styles.col8)}>
        <div className={clsx(styles.arrRunway)}>{arrRunwayFormatted}</div>
      </div>
      <div className={clsx(styles.col9)} onClick={deleteStrip}></div>
    </section>
  );
}

export default ArrivalFDE;
