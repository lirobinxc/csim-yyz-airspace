import PhaserGame from './phaser/PhaserGameConfig';
import RadarScene from './phaser/scenes/RadarScene';

import styles from './App.module.scss';
import { RadarSceneKeys } from './phaser/types/SceneKeys';
import {
  PhaserCustomEvents,
  ReactCustomEvents,
} from './phaser/types/CustomEvents';

function App() {
  const handleClick = () => {
    const RADAR_SCENE = PhaserGame.scene.keys[
      RadarSceneKeys.RADAR_06s
    ] as RadarScene;
    RADAR_SCENE.events.emit(ReactCustomEvents.CLICK_ME, { name: 'WOW' });
  };

  return (
    <div className={styles.App}>
      <button className="App-button" onClick={handleClick}>
        Or click me
      </button>
    </div>
  );
}

export default App;
