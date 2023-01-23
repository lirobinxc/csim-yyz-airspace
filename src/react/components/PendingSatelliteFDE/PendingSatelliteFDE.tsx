import clsx from 'clsx';
import styles from './PendingSatelliteFDE.module.scss';
import { DepFDE } from '../../functions/departure/genDepFDE';
import { AcType } from '../../../phaser/types/AircraftTypes';
import { departureListActions } from '../../state/slices/departureListSlice';
import { useAppDispatch } from '../../state/hooks';

function PendingSatelliteFDE(props: DepFDE) {
  const {
    acModel,
    acId,
    acType,
    assignedAlt,
    assignedHeading,
    coordinatedAlt,
    destination,
    depPoint,
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
    satFdeData,
    sidName,
  } = props;

  const dispatch = useAppDispatch();
  const depRunwayFormatted = depRunway?.split(' ')[2];
  const sidNameFormatted = satFdeData.depRoute.split(' ')[0];

  const isJetFpBelow230 = acType === AcType.JET && filedAlt < 230;

  const satName = satFdeData.name;
  const satType = satFdeData.name.split('_')[1];
  const isArrival = satType === 'ARR';
  const isDeparture = satType === 'ARR';
  const isYhmArrival = isArrival && satFdeData.destination === 'CYHM';
  const isYpqOrYooArrival =
    (isArrival && satFdeData.destination === 'CYPQ') ||
    satFdeData.destination === 'CYOO';
  const isYzdDep = satFdeData.depPoint === 'CYZD';

  function deleteStrip() {
    dispatch(departureListActions.deleteStrip(props));
  }

  return (
    <li
      className={clsx(styles.PendingSatelliteFDE, {
        [styles.bgSatelliteGreen]: isYpqOrYooArrival && isYzdDep,
      })}
    >
      <div className={clsx(styles.box, styles.widthXl, styles.acId)}>
        {acId.code}
      </div>
      <div
        className={clsx(styles.box, styles.widthMd, styles.acModel, {
          [styles.bgWhite]: isQ400,
        })}
      >
        {acModel}
      </div>
      <div className={clsx(styles.box, styles.widthMd, styles.eta)}>{ETA}</div>
      <div className={clsx(styles.box, styles.widthLg, styles.depPoint)}>
        {depPoint}
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
      <div
        className={clsx(styles.box, styles.widthLg, styles.destination)}
        onClick={deleteStrip}
      >
        {destination}
      </div>
    </li>
  );
}

export default PendingSatelliteFDE;
