import styles from './App.module.scss';

import './App.module.scss';
import MenuSection from './react/components/MenuSection';
import DepFdeSection from './react/components/DepFdeSection';
import { useAppSelector } from './react/state/hooks';
import { selectSimOptions } from './react/state/slices/simOptionsSlice';
import { TerminalPosition } from './phaser/types/SimTypes';
import FdeSectionArr from './react/components/ArrFdeSection';

function App() {
  const simOptions = useAppSelector(selectSimOptions);

  return (
    <div className={styles.App}>
      <MenuSection appVersion="1.0" />
      {simOptions.terminalPosition === TerminalPosition.DEPARTURE ? (
        <DepFdeSection />
      ) : (
        <FdeSectionArr />
      )}
    </div>
  );
}

export default App;
