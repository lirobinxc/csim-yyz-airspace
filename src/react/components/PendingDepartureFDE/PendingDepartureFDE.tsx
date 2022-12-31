import React, { useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../../images/up-arrow.png';
import { useAppDispatch } from '../../state/hooks';

import styles from './PendingDepartureFDE.module.scss';
import { departureListActions } from '../../state/slices/departureListSlice';
import { AcType } from '../../functions/genACID';
import { DepFDE } from '../../functions/genDepFdeData';
import { SatelliteData } from '../../data/satelliteCollection';
import useInterval from 'use-interval';

function PendingDepartureFDE({
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
  isVDP,
  depRunway,
  sidName,
}: DepFDE) {
  const depRunwayFormatted = depRunway?.split(' ')[2];
  const sidNameFormatted = sidName.split(' ')[0];

  return (
    <li className={clsx(styles.PendingDepartureFDE)}>
      <div className={clsx(styles.box, styles.widthMd, styles.acId)}>
        {acId}
      </div>
      <div className={clsx(styles.box, styles.widthMd, styles.acFullName)}>
        {acFullName}
      </div>
      <div className={clsx(styles.box, styles.widthSm, styles.depRunway)}>
        {depRunwayFormatted}
      </div>
      <div className={clsx(styles.box, styles.widthLg, styles.sidName)}>
        {sidNameFormatted}
      </div>
      <div className={clsx(styles.box, styles.widthMd, styles.filedAlt)}>
        {filedAlt}
      </div>
      <div className={clsx(styles.box, styles.widthSm, styles.assignedAlt)}>
        {assignedAlt}
      </div>
      <div className={clsx(styles.box, styles.widthSm, styles.emptyBox)}> </div>
    </li>
  );
}

export default PendingDepartureFDE;
