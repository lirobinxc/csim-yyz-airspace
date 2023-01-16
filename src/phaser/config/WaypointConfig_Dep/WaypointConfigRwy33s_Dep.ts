import { AcType } from '../../types/AircraftTypes';
import { GameConfig } from '../GameConfig';
import { WP_LIST_COMMON_DEP } from './WaypointConfigCommon_Dep';
import type {
  WaypointData33sDep,
  WaypointKeys33sDep,
} from '../../types/WaypointTypesDep';

const gameHeight = GameConfig.height;

export const WP_LIST_RWY33s_DEP: WaypointData33sDep[] = [
  ...WP_LIST_COMMON_DEP,
  {
    name: 'BOTIB',
    relativeCoord: new Phaser.Math.Vector2(0.749, 0.574),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'DUVAK',
    relativeCoord: new Phaser.Math.Vector2(0.773, 0.478),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'IGTUL',
    relativeCoord: new Phaser.Math.Vector2(0.791, 0.627),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.PROP,
  },
  {
    name: 'NUBAN',
    relativeCoord: new Phaser.Math.Vector2(0.63, 0.42),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.PROP,
  },
  {
    name: 'NUBAX',
    relativeCoord: new Phaser.Math.Vector2(0.353, 0.435),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'SERPI',
    relativeCoord: new Phaser.Math.Vector2(0.385, 0.553),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.PROP,
  },
  {
    name: 'TANGU',
    relativeCoord: new Phaser.Math.Vector2(0.353, 0.596),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'TETAD',
    relativeCoord: new Phaser.Math.Vector2(0.286, 0.373),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'VIVET',
    relativeCoord: new Phaser.Math.Vector2(0.576, 0.357),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  // Overwrite the common VERDO / DEDKI coordinates (due to map placing issues)
  {
    name: 'VERDO',
    relativeCoord: new Phaser.Math.Vector2(1, 0.504),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'DEDKI',
    relativeCoord: new Phaser.Math.Vector2(1, 0.563),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
];

export const WP_DICT_Rwy33s = genDictFromWaypointList(WP_LIST_RWY33s_DEP);

function genDictFromWaypointList(wpArr: WaypointData33sDep[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointKeys33sDep);

  return wpDict;
}
