import Phaser from 'phaser';
import { MasterGameOptions, DebugGameOptions } from './MasterGameOptions';
import RadarScene from './scenes/RadarScene';
import { RadarSceneKeys } from './types/SceneKeys';

const isDebugMode = false;

export const PhaserGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#000',
  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: MasterGameOptions.height,
    height: MasterGameOptions.height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      fps: isDebugMode ? DebugGameOptions.fps : MasterGameOptions.fps,
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
