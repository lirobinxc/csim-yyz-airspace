import logo from './logo.svg';
import phaserGame from './PhaserGame';
import HelloWorldScene from './scenes/HelloWorldScene';

import styles from './App.module.scss';

function App() {
  const handleClick = () => {
    const scene = phaserGame.scene.keys.helloworld as HelloWorldScene;
    scene.createEmitter();
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
