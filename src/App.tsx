import phaserGame from './phaser/PhaserGameConfig';
import RadarScene from './phaser/scenes/RadarScene';

import styles from './App.module.scss';

function App() {
  const handleClick = () => {
    const scene = phaserGame.scene.keys.helloworld as RadarScene;
    // scene.createEmitter();
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
