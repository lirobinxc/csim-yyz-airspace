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
    relativeCoord: new Phaser.Math.Vector2(0.681, 0.329),
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
    relativeCoord: new Phaser.Math.Vector2(0.339, 0.737),
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
    relativeCoord: new Phaser.Math.Vector2(0.386, 0.706),
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
    relativeCoord: new Phaser.Math.Vector2(0.381, 0.277),
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
    relativeCoord: new Phaser.Math.Vector2(0.611, 0.694),
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
    relativeCoord: new Phaser.Math.Vector2(0.127, 0.61),
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
    relativeCoord: new Phaser.Math.Vector2(0.325, 0.592),
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
    relativeCoord: new Phaser.Math.Vector2(0.221, 0.55),
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
    relativeCoord: new Phaser.Math.Vector2(0.356, 0.614),
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
    relativeCoord: new Phaser.Math.Vector2(0.031, 0.614),
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
    relativeCoord: new Phaser.Math.Vector2(0.227, 0.662),
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
    relativeCoord: new Phaser.Math.Vector2(0.239, 0.694),
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
    relativeCoord: new Phaser.Math.Vector2(0.409, 0.54),
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
    relativeCoord: new Phaser.Math.Vector2(0.518, 0.412),
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
    relativeCoord: new Phaser.Math.Vector2(0.244, 0.797),
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
    relativeCoord: new Phaser.Math.Vector2(1, 0.319),
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
    relativeCoord: new Phaser.Math.Vector2(0.175, 0.581),
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
    relativeCoord: new Phaser.Math.Vector2(0.293, 0.768),
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
    relativeCoord: new Phaser.Math.Vector2(0.395, 0.439),
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
    relativeCoord: new Phaser.Math.Vector2(0.591, 0.519),
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
    relativeCoord: new Phaser.Math.Vector2(0.565, 0.367),
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
    relativeCoord: new Phaser.Math.Vector2(0.606, 0.55),
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
    relativeCoord: new Phaser.Math.Vector2(0.633, 0.878),
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
    relativeCoord: new Phaser.Math.Vector2(0.587, 0.657),
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
    relativeCoord: new Phaser.Math.Vector2(0.903, 0.123),
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
    relativeCoord: new Phaser.Math.Vector2(0.269, 0.52),
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
    relativeCoord: new Phaser.Math.Vector2(0.736, 0.424),
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
    relativeCoord: new Phaser.Math.Vector2(0.433, 0.564),
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
