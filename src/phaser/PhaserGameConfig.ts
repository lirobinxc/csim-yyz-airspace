import Phaser from 'phaser';

import RadarScene from './scenes/RadarScene';
import { RadarSceneKeys } from './types/SceneKeys';

const GAME_RESOLUTION_HEIGHT = 1080; // square
const IS_DEBUG_MODE = true;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#000',

  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: GAME_RESOLUTION_HEIGHT,
    height: GAME_RESOLUTION_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      fps: 0.5,
    },
  },
  scene: [new RadarScene(RadarSceneKeys.RADAR_06s, { isDebug: IS_DEBUG_MODE })],
  render: {
    antialias: true,
  },
  disableContextMenu: true,
};

export default new Phaser.Game(config);
