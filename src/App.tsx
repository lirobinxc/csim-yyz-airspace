import phaserGame from './phaser/PhaserGameConfig';
import Radar06sScene from './phaser/scenes/Radar06sScene';

import styles from './App.module.scss';

function App() {
  const handleClick = () => {
    const scene = phaserGame.scene.keys.helloworld as Radar06sScene;
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
