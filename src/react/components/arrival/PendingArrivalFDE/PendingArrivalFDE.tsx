import clsx from 'clsx';
import { ArrFDE } from '../../../functions/arrival/genArrFDE';

import styles from './PendingArrivalFDE.module.scss';

function PendingArrivalFDE(props: ArrFDE) {
  const { acId } = props;

  return (
    <section className={clsx(styles.PendingArrivalFDE)}>
      <div className={clsx(styles.col1)}>
        <div className={clsx(styles.acId)}>{acId.code}</div>
      </div>
    </section>
  );
}

export default PendingArrivalFDE;
