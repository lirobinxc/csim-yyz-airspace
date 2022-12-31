import PhaserGame from './phaser/PhaserGameConfig';
import RadarScene from './phaser/scenes/RadarScene';

import styles from './App.module.scss';
import { RadarSceneKeys } from './phaser/types/SceneKeys';
import {
  PhaserCustomEvents,
  ReactCustomEvents,
} from './phaser/types/CustomEvents';

const examplePhaserFunction = () => {
  const RADAR_SCENE = PhaserGame.scene.keys[
    RadarSceneKeys.RADAR_06s
  ] as RadarScene;
  RADAR_SCENE.events.emit(ReactCustomEvents.CLICK_ME, { name: 'WOW' });
};

function App() {
  return <div className={styles.App}></div>;
}

export default App;
