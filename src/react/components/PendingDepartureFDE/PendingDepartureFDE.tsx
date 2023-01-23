import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import { useAppDispatch } from '../../state/hooks';

import styles from './PendingDepartureFDE.module.scss';
import { departureListActions } from '../../state/slices/departureListSlice';
import { DepFDE } from '../../functions/departure/genDepFDE';
import { AcType } from '../../../phaser/types/AircraftTypes';

function PendingDepartureFDE(props: DepFDE) {
  const {
    acModelFull,
    acId,
    acType,
    assignedAlt,
    filedAlt,
    isQ400 = false,
    isVDP,
    depRunway,
    sidName,
  } = props;

  const dispatch = useAppDispatch();
  const depRunwayFormatted = depRunway?.split(' ')[2];
  const sidNameFormatted = sidName.split(' ')[0];

  const isJetFpBelow230 = acType === AcType.JET && filedAlt < 230;

  function deleteStrip() {
    dispatch(departureListActions.deleteStrip(props));
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
