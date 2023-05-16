import { AcType } from '../../types/AircraftTypes';
import {
  WaypointDataArrCommon,
  WaypointDictArrCommon,
} from '../../types/WaypointTypesArr';
import { MasterEngineOptions } from '../../MasterEngineOptions';

const gameHeight = MasterEngineOptions.height;

export const WP_LIST_ARR_COMMON: WaypointDataArrCommon[] = [
  {
    name: 'BOXUM',
    relativeCoord: new Phaser.Math.Vector2(0.243, 0),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DUVOS',
    relativeCoord: new Phaser.Math.Vector2(0.283, 0.07),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ERBUS',
    relativeCoord: new Phaser.Math.Vector2(0.443, 0.408),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'IMEBA',
    relativeCoord: new Phaser.Math.Vector2(1, 0.034),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LINNG',
    relativeCoord: new Phaser.Math.Vector2(0.641, 0.952),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'NUBER',
    relativeCoord: new Phaser.Math.Vector2(0.0, 0.61),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'RAGID',
    relativeCoord: new Phaser.Math.Vector2(1.136, 0.273),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'VERKO',
    relativeCoord: new Phaser.Math.Vector2(0.552, 0.601),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
];

export const WP_DICT_ARR_COMMON = genDictFromWaypointList(WP_LIST_ARR_COMMON);

function genDictFromWaypointList(wpArr: WaypointDataArrCommon[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointDictArrCommon);

  return wpDict;
}
