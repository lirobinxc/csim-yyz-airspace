import { AcType } from '../../types/AircraftTypes';
import {
  WaypointDataArr24s,
  WaypointDict24sArr,
} from '../../types/WaypointTypesArr';
import { MasterGameOptions } from '../../MasterGameOptions';
import { WP_LIST_ARR_COMMON } from './WaypointConfigArrCommon';

const gameHeight = MasterGameOptions.height;

export const WP_LIST_ARR_24s: WaypointDataArr24s[] = [
  ...WP_LIST_ARR_COMMON,
  {
    name: 'ADSED',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'AMILU',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'BIMPO',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'BOTUM',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'CALVY',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DAVIK',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DAVNO',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DEKNI',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DENKA',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DUGDA',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DUNOL',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'EBDAL',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LEPUX',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LEVIG',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MANUP',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MAROD',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MIPED',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'NOAHA',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'OMTOK',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'PENGO',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ROKTO',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'SATUR',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'TASKU',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'YOUTH',
    relativeCoord: new Phaser.Math.Vector2(),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
];

export const WP_DICT_ARR_24s = genDictFromWaypointList(WP_LIST_ARR_24s);

function genDictFromWaypointList(wpArr: WaypointDataArr24s[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointDict24sArr);

  return wpDict;
}
