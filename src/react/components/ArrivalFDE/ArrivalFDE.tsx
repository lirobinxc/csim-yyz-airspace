import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import downArrow from '../../images/down-arrow.png';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import styles from './ArrivalFDE.module.scss';
import {
  selectSimOptions,
  simOptionsActions,
} from '../../state/slices/simOptionsSlice';
import { ArrFDE } from '../../functions/arrival/genArrFDE';
import { arrivalListActions } from '../../state/slices/arrivalListSlice';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCourse, setOnCourse] = useState(false);
  const [stripIsSelected, setStripIsSelected] = useState(false);
  const [isCommSwitched, setIsCommSwitched] = useState(false);

  function handleClickAlt() {
    setCurrentAlt(currentAlt + 10);
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

  return (
    <section
      className={clsx(styles.ArrivalStrip, styles.flexCol, {
        [styles.borderYellow]:
          simOptions.selectedArrStrip?.uniqueKey === uniqueKey,
      })}
    >
      <div className={clsx(styles.topRow, styles.flexRow)}>
        <div className={clsx(styles.col1)} onClick={handleAcIdClick}>
          <div className={clsx(styles.acId)}>{acId.code}</div>
        </div>
        <div className={clsx(styles.col2)}>
          <div className={clsx(styles.ETA)}>{ETA}Z</div>
          <div className={clsx(styles.transponderCode)}>{transponderCode}</div>
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
        <div className={clsx(styles.col8)} onClick={deleteStrip}>
          <div className={clsx(styles.runwayId)} onClick={deleteStrip}>
            {'XX'}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArrivalFDE;
