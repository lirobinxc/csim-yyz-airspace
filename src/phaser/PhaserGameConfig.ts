import Phaser from 'phaser';
import { MasterGameConfig, DebugGameConfig } from './config/MasterGameConfig';
import RadarScene from './scenes/RadarScene';
import { RadarSceneKeys } from './types/SceneKeys';

const isDebugMode = false;

export const PhaserGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#000',
  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: MasterGameConfig.height,
    height: MasterGameConfig.height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      fps: isDebugMode ? DebugGameConfig.fps : MasterGameConfig.fps,
    },
  },
  scene: [new RadarScene(RadarSceneKeys.RADAR_06s)],
  render: {
    antialias: true,
  },
  disableContextMenu: true,
};

const PhaserGame = new Phaser.Game(PhaserGameConfig);
export default PhaserGame;
