import styles from './App.module.scss';

import './App.module.scss';
import MenuSection from './react/components/MenuSection';
import DepFdeSection from './react/components/departure/DepFdeSection';
import { useAppSelector } from './react/state/hooks';
import { selectSimOptions } from './react/state/slices/simOptionsSlice';
import { TerminalPosition } from './phaser/types/SimTypes';
import ArrFdeSection from './react/components/arrival/ArrFdeSection';
import { MasterGameOptions } from './phaser/MasterGameOptions';

function App() {
  const simOptions = useAppSelector(selectSimOptions);

  return (
    <div className={styles.App}>
      <MenuSection appVersion={MasterGameOptions.appVersion} />
      {simOptions.terminalPosition === TerminalPosition.DEPARTURE ? (
        <DepFdeSection />
      ) : (
        <ArrFdeSection />
      )}
    </div>
  );
}

export default App;
