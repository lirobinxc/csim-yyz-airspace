import Phaser from 'phaser';
import { GameConfig } from './config/GameConfig';

import RadarScene from './scenes/RadarScene';
import { RadarSceneKeys } from './types/SceneKeys';

const Config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#000',

  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: GameConfig.height,
    height: GameConfig.height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      fps: 0.5,
    },
  },
  scene: [
    new RadarScene(RadarSceneKeys.RADAR_06s, { isDebug: GameConfig.isDebug }),
  ],
  render: {
    antialias: true,
  },
  disableContextMenu: true,
};

export default new Phaser.Game(Config);
