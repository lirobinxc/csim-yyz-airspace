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
import ArrFdeSpeedModal from '../ArrFdeSpeedModal';
import { PlaneCommandCue } from '../../../../phaser/objects/Plane/PlaneCommandMenu';
import PhaserGame from '../../../../phaser/PhaserGameConfig';
import { OtherSceneKeys } from '../../../../phaser/types/SceneKeys';
import RadarScene from '../../../../phaser/scenes/RadarScene';
import { ReactCustomEvents } from '../../../../phaser/types/CustomEvents';
import { RecatGroup } from '../../../../phaser/config/RecatSpacing';

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
    recat,
    starName,
    transponderCode,
  } = props;

  const dispatch = useAppDispatch();
  const simOptions = useAppSelector(selectSimOptions);
  const [fdeAltitude, setFdeAltitude] = useState(assignedAlt);
  const [fdeHeading, setFdeHeading] = useState<number | null>(null);
  const [fdeSpeed, setFdeSpeed] = useState<number | null>(null);
  const [apprClr, setApprClr] = useState(false);
  const [interceptLoc, setInterceptLoc] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState<AtcInstruction | null>(null);
  const [stripIsSelected, setStripIsSelected] = useState(false);
  const [prevCommandCue, setPrevCommandCue] = useState<PlaneCommandCue>({
    directTo: null,
    heading: fdeHeading,
    altitude: assignedAlt,
    speed: assignedSpeed,
    interceptLoc: false,
    approachClearance: false,
  });

  function handleClickAlt() {
    if (fdeAltitude - 10 < 30) {
      setFdeAltitude(0);
      return;
    }

    setFdeAltitude(fdeAltitude - 10);
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

  useEffect(() => {
    if (simOptions.selectedArrStrip?.uniqueKey === uniqueKey) {
      setStripIsSelected(true);
    } else {
      setStripIsSelected(false);
    }
  }, [simOptions, uniqueKey]);

  useEffect(() => {
    if (apprClr) {
      setInterceptLoc(true);
    }
  }, [apprClr]);

  useEffect(() => {
    if (!interceptLoc) {
      setApprClr(false);
    }
  }, [interceptLoc]);

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

  function displaySpeed() {
    switch (fdeSpeed) {
      case 0:
        return 'RNAV';
      case null:
        return 'RNAV';
      case assignedSpeed:
        return 'RNAV';
      default:
        return fdeSpeed;
    }
  }

  const arrRunwayFormatted = arrRunway.split(' ')[2];

  return (
    <section
      className={clsx(styles.ArrivalStrip, styles.flexRow)}
      onContextMenu={sendCommandCue}
    >
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
          <div
            className={clsx(styles.acModelFull, { [styles.bgWhite]: isQ400 })}
          >
            {acModelFull}
          </div>
          <div
            className={clsx(styles.recat, {
              [styles.bgWhite]: recat === RecatGroup.G,
            })}
          >
            {recat}
          </div>
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
          onAltitudeClick={(alt) => setFdeAltitude(alt)}
          onCloseModal={closeModal}
        />
        <div className={clsx(styles.assignedAlt)}>
          {fdeAltitude >= 30 ? fdeAltitude : 'A'}
        </div>
      </div>
      <div
        className={clsx(styles.col5)}
        onClick={() =>
          modalIsOpen ? closeModal() : openModal(AtcInstruction.SPEED)
        }
      >
        <ArrFdeSpeedModal
          speeds={[0, 160, 170, 180, 190, 200, 210, 220, 250]}
          isVisible={modalIsOpen === AtcInstruction.SPEED}
          onSpeedClick={(speed) => setFdeSpeed(speed)}
          onCloseModal={closeModal}
        />
        <div className={clsx(styles.assignedSpeed)}>{displaySpeed()}</div>
      </div>
      <div className={clsx(styles.col6)}>
        <FdeHeadingModal
          isVisible={modalIsOpen === AtcInstruction.HEADING}
          onHeadingClick={(hdg) => setFdeHeading(hdg)}
          onInterceptClick={() => setInterceptLoc(!interceptLoc)}
          onApproachClearanceClick={() => setApprClr(!apprClr)}
          onCloseModal={closeModal}
        />
        <div
          className={clsx(styles.assignedHeading)}
          onClick={() =>
            modalIsOpen ? closeModal() : openModal(AtcInstruction.HEADING)
          }
        >
          {fdeHeading}
        </div>
        <div className={clsx(styles.arrivalButtons)}>
          <button
            onClick={() => {
              setInterceptLoc(!interceptLoc);
            }}
            className={clsx({ [styles.bgGreen]: interceptLoc })}
          >
            I
          </button>
          <button
            onClick={() => {
              setApprClr(!apprClr);
            }}
            className={clsx({ [styles.bgGreen]: apprClr })}
          >
            AC
          </button>
        </div>
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
