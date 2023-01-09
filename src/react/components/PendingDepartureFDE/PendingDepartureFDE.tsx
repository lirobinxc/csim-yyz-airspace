import React, { useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../images/up-arrow.png';
import { useAppDispatch } from '../../state/hooks';

import styles from './PendingDepartureFDE.module.scss';
import { departureListActions } from '../../state/slices/departureListSlice';
import { DepFDE } from '../../functions/genDepFdeData';
import { SatelliteData } from '../../data/satelliteCollection';
import useInterval from 'use-interval';
import { AcType } from '../../../phaser/types/AircraftTypes';

function PendingDepartureFDE({
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
  sidName,
}: DepFDE) {
  const dispatch = useAppDispatch();
  const depRunwayFormatted = depRunway?.split(' ')[2];
  const sidNameFormatted = sidName.split(' ')[0];

  const isJetFpBelow230 = acType === AcType.JET && filedAlt < 230;

  function deleteStrip() {
    dispatch(departureListActions.deleteStrip(acId.code));
  }

  return (
    <li className={clsx(styles.PendingDepartureFDE)}>
      <div
        className={clsx(styles.box, styles.widthLg, styles.acId, {
          [styles.bgYellow]: isVDP,
        })}
      >
        {acId.code}
      </div>
      <div
        className={clsx(styles.box, styles.widthLg, styles.acFullName, {
          [styles.bgWhite]: isQ400,
        })}
      >
        {acModelFull}
      </div>
      <div className={clsx(styles.box, styles.widthSm, styles.depRunway)}>
        {depRunwayFormatted}
      </div>
      <div className={clsx(styles.box, styles.sidName)}>{sidNameFormatted}</div>
      <div
        className={clsx(styles.box, styles.widthMd, styles.filedAlt, {
          [styles.colorRed]: isJetFpBelow230,
        })}
      >
        {filedAlt}
      </div>
      <div className={clsx(styles.box, styles.widthSm, styles.assignedAlt)}>
        {assignedAlt}
      </div>
      <div
        className={clsx(styles.box, styles.widthXs, styles.emptyBox)}
        onClick={deleteStrip}
      >
        {' '}
      </div>
    </li>
  );
}

export default PendingDepartureFDE;
