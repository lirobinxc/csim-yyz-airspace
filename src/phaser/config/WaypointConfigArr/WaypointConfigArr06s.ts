import { AcType } from '../../types/AircraftTypes';
import {
  WaypointDataArr06s,
  WaypointDict06sArr,
} from '../../types/WaypointTypesArr';
import { MasterGameOptions } from '../../MasterGameOptions';
import { WP_LIST_ARR_COMMON } from './WaypointConfigArrCommon';

const gameHeight = MasterGameOptions.height;

export const WP_LIST_ARR_06s: WaypointDataArr06s[] = [
  ...WP_LIST_ARR_COMMON,
  {
    name: 'BISDA',
    relativeCoord: new Phaser.Math.Vector2(0.67, 0.339),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DANIP',
    relativeCoord: new Phaser.Math.Vector2(0.349, 0.722),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DARPU',
    relativeCoord: new Phaser.Math.Vector2(0.393, 0.695),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DEBGO',
    relativeCoord: new Phaser.Math.Vector2(0.389, 0.29),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DEGRO',
    relativeCoord: new Phaser.Math.Vector2(0.604, 0.682),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DERLI',
    relativeCoord: new Phaser.Math.Vector2(0.15, 0.603),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DULPA',
    relativeCoord: new Phaser.Math.Vector2(0.339, 0.583),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'DUNOP',
    relativeCoord: new Phaser.Math.Vector2(0.239, 0.547),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'FAYOL',
    relativeCoord: new Phaser.Math.Vector2(0.365, 0.607),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'IKBAT',
    relativeCoord: new Phaser.Math.Vector2(0.061, 0.606),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'ILANI',
    relativeCoord: new Phaser.Math.Vector2(0.24, 0.648),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'KEDRO',
    relativeCoord: new Phaser.Math.Vector2(0.251, 0.678),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'KERPU',
    relativeCoord: new Phaser.Math.Vector2(0.412, 0.537),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'KEVNO',
    relativeCoord: new Phaser.Math.Vector2(0.516, 0.417),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LERAN',
    relativeCoord: new Phaser.Math.Vector2(0.26, 0.778),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LERAT',
    relativeCoord: new Phaser.Math.Vector2(0.986, 0.322),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'LITRO',
    relativeCoord: new Phaser.Math.Vector2(0.196, 0.574),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MASAR',
    relativeCoord: new Phaser.Math.Vector2(0.305, 0.75),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'MODOL',
    relativeCoord: new Phaser.Math.Vector2(0.401, 0.442),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'PEKMO',
    relativeCoord: new Phaser.Math.Vector2(0.585, 0.518),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'PILPO',
    relativeCoord: new Phaser.Math.Vector2(0.561, 0.374),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'RESES',
    relativeCoord: new Phaser.Math.Vector2(0.598, 0.546),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'SEDAB',
    relativeCoord: new Phaser.Math.Vector2(0.624, 0.852),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'SEGOD',
    relativeCoord: new Phaser.Math.Vector2(0.581, 0.647),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'SEKOP',
    relativeCoord: new Phaser.Math.Vector2(0.876, 0.146),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'SELAP',
    relativeCoord: new Phaser.Math.Vector2(0.283, 0.519),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'SEMTI',
    relativeCoord: new Phaser.Math.Vector2(0.721, 0.428),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
  {
    name: 'VEPNA',
    relativeCoord: new Phaser.Math.Vector2(0.437, 0.56),
    getDisplayCoord: function () {
      return new Phaser.Math.Vector2(
        this.relativeCoord.x,
        this.relativeCoord.y
      ).scale(gameHeight);
    },
    type: null,
  },
];

export const WP_DICT_ARR_06s = genDictFromWaypointList(WP_LIST_ARR_06s);

function genDictFromWaypointList(wpArr: WaypointDataArr06s[]) {
  const wpDict = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      name: item.name,
      type: item.type,
      relativeCoord: item.relativeCoord,
      getDisplayCoord: item.getDisplayCoord,
    };
    return acc;
  }, {} as WaypointDict06sArr);

  return wpDict;
}
