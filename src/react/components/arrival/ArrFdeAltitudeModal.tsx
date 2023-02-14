import clsx from 'clsx';
import styles from './ArrFdeAltitudeModal.module.scss';

interface ArrFdeAltitudeModalProps {
  altitudes: number[];
  onAltitudeClick: (alt: number) => void;
  onCloseModal: () => void;
  isVisible: boolean;
}

const ArrFdeAltitudeModal = ({
  altitudes,
  onAltitudeClick,
  onCloseModal,
  isVisible,
}: ArrFdeAltitudeModalProps) => {
  return (
    <aside
      className={clsx(styles.ArrFdeAltitudeModal, {
        [styles.displayNone]: !isVisible,
      })}
    >
      <div className={styles.content}>
        {altitudes.map((alt) => (
          <button
            key={alt}
            onClick={() => {
              onAltitudeClick(alt);
              onCloseModal();
            }}
          >
            {alt === 0 ? 'A' : alt}
          </button>
        ))}
      </div>
      <div className={styles.overlay} onClick={onCloseModal}></div>
    </aside>
  );
};

export default ArrFdeAltitudeModal;
