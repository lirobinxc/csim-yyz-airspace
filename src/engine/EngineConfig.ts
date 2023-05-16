import Phaser from 'phaser';
import { MasterEngineOptions, DebugGameOptions } from './MasterEngineOptions';
import RadarScene from './scenes/RadarScene';
import { RadarSceneKeys } from './types/SceneKeys';

const isDebugMode = false;

export const EngineConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#000',
  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: MasterEngineOptions.height,
    height: MasterEngineOptions.height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      fps: isDebugMode ? DebugGameOptions.fps : MasterEngineOptions.fps,
    },
  },
  scene: [new RadarScene(RadarSceneKeys.RADAR_06s)],
  render: {
    antialias: true,
  },
  disableContextMenu: true,
};

const Engine = new Phaser.Game(EngineConfig);
export default Engine;
