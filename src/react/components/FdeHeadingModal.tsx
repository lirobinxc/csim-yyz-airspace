import clsx from 'clsx';
import { useState } from 'react';
import styles from './FdeHeadingModal.module.scss';

interface FdeHeadingModalProps {
  isVisible: boolean;
  onHeadingClick: (hdg: number | null) => void;
  onCloseModal: () => void;
}

const HEADINGS = (function () {
  const headings: number[] = [];

  for (let i = 90; i < 370; i += 10) {
    headings.push(i);
  }
  for (let i = 10; i < 90; i += 10) {
    headings.push(i);
  }
  return headings;
})();

const FdeHeadingModal = ({
  onHeadingClick,
  onCloseModal,
  isVisible,
}: FdeHeadingModalProps) => {
  const [apprClr, setApprClr] = useState(false);
  const [interceptLoc, setInterceptLoc] = useState(false);

  return (
    <aside
      className={clsx(styles.FdeHeadingModal, {
        [styles.displayNone]: !isVisible,
      })}
    >
      <div className={styles.wrapper}>
        <div className={styles.headingButtons}>
          {HEADINGS.map((hdg) => (
            <button
              key={hdg}
              onClick={() => {
                onHeadingClick(hdg);
                onCloseModal();
              }}
              className={clsx({
                [styles.colorGreen]: [90, 180, 270, 360].includes(hdg),
                [styles.colorBlue]: [60, 150, 240, 330].includes(hdg),
              })}
            >
              {hdg}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.overlay} onClick={onCloseModal}></div>
    </aside>
  );
};

export default FdeHeadingModal;
