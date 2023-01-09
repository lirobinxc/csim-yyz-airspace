import { AcType } from '../types/AircraftTypes';
import { GameConfig } from './GameConfig';
import { WP_LIST_COMMON } from './WaypointConfigCommon';
import type { WaypointData15s, WaypointKeys15s } from '../types/WaypointTypes';

const gameHeight = GameConfig.height;

export const WP_LIST_RWY15s: WaypointData15s[] = [
  ...WP_LIST_COMMON,
  {
    name: 'BORUX',
    relativeCoord: new Phaser.Math.Vector2(0.651, 0.54),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'BOVAL',
    relativeCoord: new Phaser.Math.Vector2(0.469, 0.644),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'ETLER',
    relativeCoord: new Phaser.Math.Vector2(0.642, 0.373),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'IPSOT',
    relativeCoord: new Phaser.Math.Vector2(0.356, 0.59),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'KODAL',
    relativeCoord: new Phaser.Math.Vector2(0.937, 0.605),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'VIBNA',
    relativeCoord: new Phaser.Math.Vector2(0.283, 0.495),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
];

export const WP_DICT_Rwy15s = genDictFromWaypointList(WP_LIST_RWY15s);

function genDictFromWaypointList(wpArr: WaypointData15s[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointKeys15s);

  return wpDict;
}
