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
import ArrFdeAltitudeModal from '../ArrFdeAltitudeModal';
import { PlaneCommands } from '../../../../phaser/types/PlaneInterfaces';
import { AtcInstruction } from '../../../../phaser/types/PlaneCommandTypes';
import FdeHeadingModal from '../../FdeHeadingModal';

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
  const [currentHeading, setCurrentHeading] = useState<number | null>(null);
  const [currentSpeed, setCurrentSpeed] = useState(assignedSpeed);
  const [modalIsOpen, setModalIsOpen] = useState<AtcInstruction | null>(null);
  const [stripIsSelected, setStripIsSelected] = useState(false);

  function handleClickAlt() {
    if (currentAlt - 10 < 30) {
      setCurrentAlt(0);
      return;
    }

    setCurrentAlt(currentAlt - 10);
  }

  function openModal(name: AtcInstruction) {
    setModalIsOpen(name);
    console.log('opening modal', name);
  }
  function closeModal() {
    setModalIsOpen(null);
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
      <div
        className={clsx(styles.col4)}
        onClick={() =>
          modalIsOpen ? closeModal() : openModal(AtcInstruction.ALTITUDE)
        }
      >
        <ArrFdeAltitudeModal
          altitudes={[120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 0]}
          isVisible={modalIsOpen === AtcInstruction.ALTITUDE}
          onAltitudeClick={(alt) => setCurrentAlt(alt)}
          onCloseModal={closeModal}
        />
        <div className={clsx(styles.assignedAlt)}>
          {currentAlt >= 30 ? currentAlt : 'A'}
        </div>
      </div>
      <div className={clsx(styles.col5)}>
        <div className={clsx(styles.assignedSpeed)}>
          {currentSpeed === assignedSpeed ? 'RNAV' : currentSpeed}
        </div>
      </div>
      <div
        className={clsx(styles.col6)}
        onClick={() =>
          modalIsOpen ? closeModal() : openModal(AtcInstruction.HEADING)
        }
      >
        <FdeHeadingModal
          isVisible={modalIsOpen === AtcInstruction.HEADING}
          onHeadingClick={(hdg) => setCurrentHeading(hdg)}
          onCloseModal={closeModal}
        />
        <div className={clsx(styles.assignedHeading)}>{currentHeading}</div>
      </div>
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
