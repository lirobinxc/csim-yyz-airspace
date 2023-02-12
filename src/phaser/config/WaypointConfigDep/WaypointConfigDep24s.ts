import { AcType } from '../../types/AircraftTypes';
import { MasterGameConfig } from '../MasterGameConfig';
import { WP_LIST_DEP_COMMON } from './WaypointConfigDepCommon';
import type {
  WaypointDataDep24s,
  WaypointDictDep24s,
} from '../../types/WaypointTypesDep';

const gameHeight = MasterGameConfig.height;

export const WP_LIST_DEP_24s: WaypointDataDep24s[] = [
  ...WP_LIST_DEP_COMMON,
  {
    name: 'BISTI',
    relativeCoord: new Phaser.Math.Vector2(0.343, 0.393),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'GAGPO',
    relativeCoord: new Phaser.Math.Vector2(0.65, 0.633),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.PROP,
  },
  {
    name: 'MATES',
    relativeCoord: new Phaser.Math.Vector2(0.414, 0.343),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.PROP,
  },
  {
    name: 'MAVAN',
    relativeCoord: new Phaser.Math.Vector2(0.534, 0.628),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.PROP,
  },
  {
    name: 'MURNO',
    relativeCoord: new Phaser.Math.Vector2(0.415, 0.758),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'NAMGI',
    relativeCoord: new Phaser.Math.Vector2(0.449, 0.302),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'SAVUR',
    relativeCoord: new Phaser.Math.Vector2(0.506, 0.679),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'SEKIT',
    relativeCoord: new Phaser.Math.Vector2(0.631, 0.673),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
  {
    name: 'TILAM',
    relativeCoord: new Phaser.Math.Vector2(0.275, 0.428),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: AcType.JET,
  },
];

export const WP_DICT_DEP_24s = genDictFromWaypointList(WP_LIST_DEP_24s);

function genDictFromWaypointList(wpArr: WaypointDataDep24s[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointDictDep24s);

  return wpDict;
}
