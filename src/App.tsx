import styles from './App.module.scss';

import './App.module.scss';
import MenuSection from './react/components/MenuSection';
import DepFdeSection from './react/components/departure/DepFdeSection';
import { useAppSelector } from './react/state/hooks';
import { selectSimOptions } from './react/state/slices/simOptionsSlice';
import { TerminalPosition } from './engine/types/SimTypes';
import ArrFdeSection from './react/components/arrival/ArrFdeSection';
import { MasterEngineOptions } from './engine/MasterEngineOptions';

function App() {
  const simOptions = useAppSelector(selectSimOptions);

  return (
    <div className={styles.App}>
      <MenuSection appVersion={MasterEngineOptions.appVersion} />
      {simOptions.terminalPosition === TerminalPosition.DEPARTURE ? (
        <DepFdeSection />
      ) : (
        <ArrFdeSection />
      )}
    </div>
  );
}

export default App;
