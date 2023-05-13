import { AcType } from '../../types/AircraftTypes';
import { MasterGameOptions } from '../../MasterGameOptions';
import { WP_LIST_DEP_COMMON } from './WaypointConfigDepCommon';
import type {
  WaypointDataDep15s,
  WaypointDictDep15s,
} from '../../types/WaypointTypesDep';

const gameHeight = MasterGameOptions.height;

export const WP_LIST_DEP_15s: WaypointDataDep15s[] = [
  ...WP_LIST_DEP_COMMON,
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

export const WP_DICT_Rwy15s_DEP = genDictFromWaypointList(WP_LIST_DEP_15s);

function genDictFromWaypointList(wpArr: WaypointDataDep15s[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointDictDep15s);

  return wpDict;
}
