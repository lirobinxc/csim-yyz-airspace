import styles from './App.module.scss';

import './App.module.scss';
import MenuSection from './react/components/MenuSection';
import FdeSectionDep from './react/components/FdeSectionDep';
import { useAppSelector } from './react/state/hooks';
import { selectSimOptions } from './react/state/slices/simOptionsSlice';
import { TerminalPosition } from './phaser/types/SimTypes';

function App() {
  const simOptions = useAppSelector(selectSimOptions);

  return (
    <div className={styles.App}>
      <MenuSection appVersion="1.0" />
      {simOptions.terminalPosition === TerminalPosition.DEPARTURE ? (
        <FdeSectionDep />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
