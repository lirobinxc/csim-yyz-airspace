import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import { GameConfig, DebugGameConfig } from './config/GameConfig';

import RadarScene from './scenes/RadarScene';
import { RadarSceneKeys } from './types/SceneKeys';

const isDebugMode = false;

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
      fps: isDebugMode ? DebugGameConfig.fps : GameConfig.fps,
    },
  },
  scene: [new RadarScene(RadarSceneKeys.RADAR_06s, { isDebug: isDebugMode })],
  render: {
    antialias: true,
  },
  disableContextMenu: true,
};

const PhaserGame = new Phaser.Game(Config);
export default PhaserGame;
