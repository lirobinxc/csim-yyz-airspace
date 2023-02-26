import clsx from 'clsx';
import styles from './ArrFdeSpeedModal.module.scss';

interface ArrFdeSpeedModalProps {
  speeds: number[];
  onSpeedClick: (alt: number) => void;
  onCloseModal: () => void;
  isVisible: boolean;
}

const ArrFdeSpeedModal = ({
  speeds,
  onSpeedClick,
  onCloseModal,
  isVisible,
}: ArrFdeSpeedModalProps) => {
  return (
    <aside
      className={clsx(styles.ArrFdeSpeedModal, {
        [styles.displayNone]: !isVisible,
      })}
    >
      <div className={styles.content}>
        {speeds.map((alt) => (
          <button
            key={alt}
            onClick={() => {
              onSpeedClick(alt);
              onCloseModal();
            }}
            className={clsx({
              [styles.hiddenButton]: [0, 170, 190, 210, 250].includes(alt),
            })}
          >
            {alt.toString().padStart(3, '0')}
          </button>
        ))}
      </div>
      <div className={styles.overlay} onClick={onCloseModal}></div>
    </aside>
  );
};

export default ArrFdeSpeedModal;
