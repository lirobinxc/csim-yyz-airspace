import { AcType } from '../../types/AircraftTypes';
import {
  WaypointDataArrCommon,
  WaypointDictArrCommon,
} from '../../types/WaypointTypesArr';
import { MasterGameConfig } from '../GameConfig';

const gameHeight = MasterGameConfig.height;

export const WP_LIST_ARR_COMMON: WaypointDataArrCommon[] = [
  {
    name: 'BOXUM',
    relativeCoord: new Phaser.Math.Vector2(0.24, 0.0),
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
    relativeCoord: new Phaser.Math.Vector2(0.296, 0.097),
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
    relativeCoord: new Phaser.Math.Vector2(0.446, 0.413),
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
    relativeCoord: new Phaser.Math.Vector2(1, 0.032),
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
    relativeCoord: new Phaser.Math.Vector2(0.632, 0.921),
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
    relativeCoord: new Phaser.Math.Vector2(0.0, 0.606),
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
    relativeCoord: new Phaser.Math.Vector2(0.548, 0.595),
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
