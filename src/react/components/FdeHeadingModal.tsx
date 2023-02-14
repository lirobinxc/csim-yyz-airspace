import clsx from 'clsx';
import { useEffect } from 'react';
import styles from './FdeHeadingModal.module.scss';

interface FdeHeadingModalProps {
  onHeadingClick: (hdg: number | null) => void;
  onCloseModal: () => void;
  isVisible: boolean;
}

const HEADINGS = (function () {
  const headings: number[] = [];

  for (let i = 10; i < 370; i += 10) {
    headings.push(i);
  }

  return headings;
})();

const FdeHeadingModal = ({
  onHeadingClick,
  onCloseModal,
  isVisible,
}: FdeHeadingModalProps) => {
  return (
    <aside
      className={clsx(styles.FdeHeadingModal, {
        [styles.displayNone]: !isVisible,
      })}
    >
      <div className={styles.content}>
        {HEADINGS.map((hdg) => (
          <button
            key={hdg}
            onClick={() => {
              onHeadingClick(hdg);
              onCloseModal();
            }}
          >
            {hdg}
          </button>
        ))}
      </div>
      <div className={styles.overlay} onClick={onCloseModal}></div>
    </aside>
  );
};

export default FdeHeadingModal;
