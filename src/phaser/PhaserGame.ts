import Phaser from 'phaser';

import Radar06sScene from './scenes/Radar06sScene';

const IS_DEBUG_MODE = true;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#000',
  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: window.innerHeight,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [new Radar06sScene({ isDebug: IS_DEBUG_MODE })],
  render: {
    antialias: true,
  },
};

export default new Phaser.Game(config);
