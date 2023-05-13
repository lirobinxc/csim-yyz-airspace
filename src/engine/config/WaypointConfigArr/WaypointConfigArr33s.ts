import { AcType } from '../../types/AircraftTypes';
import {
  WaypointDataArr33s,
  WaypointDict33sArr,
} from '../../types/WaypointTypesArr';
import { MasterGameOptions } from '../../MasterGameOptions';
import { WP_LIST_ARR_COMMON } from './WaypointConfigArrCommon';

const gameHeight = MasterGameOptions.height;

export const WP_LIST_ARR_33s: WaypointDataArr33s[] = [
  ...WP_LIST_ARR_COMMON,
  {
    name: 'AGBEK',
    relativeCoord: new Phaser.Math.Vector2(0.604, 0.659),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ALMAX',
    relativeCoord: new Phaser.Math.Vector2(0.622, 0.875),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ALORU',
    relativeCoord: new Phaser.Math.Vector2(0.561, 0.781),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'APMAM',
    relativeCoord: new Phaser.Math.Vector2(0.543, 0.578),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DANAV',
    relativeCoord: new Phaser.Math.Vector2(0.591, 0.827),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ELVUT',
    relativeCoord: new Phaser.Math.Vector2(0.75, 0.237),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ERBAN',
    relativeCoord: new Phaser.Math.Vector2(0.594, 0.661),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'GUBOV',
    relativeCoord: new Phaser.Math.Vector2(0.695, 0.63),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'IKMEX',
    relativeCoord: new Phaser.Math.Vector2(0.647, 0.747),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'KEDSU',
    relativeCoord: new Phaser.Math.Vector2(0.782, 0.776),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'KENPU',
    relativeCoord: new Phaser.Math.Vector2(0.339, 0.551),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LETAG',
    relativeCoord: new Phaser.Math.Vector2(0.552, 0.574),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MAVID',
    relativeCoord: new Phaser.Math.Vector2(0.752, 0.727),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MIRUG',
    relativeCoord: new Phaser.Math.Vector2(0.585, 0.451),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MERKI',
    relativeCoord: new Phaser.Math.Vector2(0.705, 0.81),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'NOXER',
    relativeCoord: new Phaser.Math.Vector2(0.532, 0.733),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'NUBAV',
    relativeCoord: new Phaser.Math.Vector2(0.62, 0.406),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'OKOKU',
    relativeCoord: new Phaser.Math.Vector2(0.724, 0.678),
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
    relativeCoord: new Phaser.Math.Vector2(0.291, 0.553),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'REVOV',
    relativeCoord: new Phaser.Math.Vector2(0.415, 0.55),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'RIDOD',
    relativeCoord: new Phaser.Math.Vector2(0.656, 0.74),
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
    relativeCoord: new Phaser.Math.Vector2(0.021, 0.594),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'VIDRO',
    relativeCoord: new Phaser.Math.Vector2(0.915, 0.233),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
];

export const WP_DICT_ARR_33s = genDictFromWaypointList(WP_LIST_ARR_33s);

function genDictFromWaypointList(wpArr: WaypointDataArr33s[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointDict33sArr);

  return wpDict;
}
