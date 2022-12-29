import RadarScene from '../scenes/RadarScene';
import { AcType } from '../types/AircraftTypes';
import { CommonWaypointList } from './shared/CommonWaypoints';
import type {
  WaypointData06s,
  WaypointKeys06s,
} from './shared/WaypointsCollection';

export const Rwy06sWaypointList: WaypointData06s[] = [
  ...CommonWaypointList,
  {
    name: 'ALKUT',
    relativeCoord: new Phaser.Math.Vector2(0.79, 0.589),
    type: AcType.JET,
  },
  {
    name: 'AVROS',
    relativeCoord: new Phaser.Math.Vector2(0.925, 0.424),
    type: AcType.PROP,
  },
  {
    name: 'BIRLI',
    relativeCoord: new Phaser.Math.Vector2(0.609, 0.652),
    type: AcType.JET,
  },
  {
    name: 'DUVKO',
    relativeCoord: new Phaser.Math.Vector2(0.348, 0.336),
    type: AcType.JET,
  },
  {
    name: 'GOTIM',
    relativeCoord: new Phaser.Math.Vector2(0.576, 0.279),
    type: AcType.JET,
  },
  {
    name: 'KEDSI',
    relativeCoord: new Phaser.Math.Vector2(0.509, 0.333),
    type: AcType.JET,
  },
  {
    name: 'KODAL',
    relativeCoord: new Phaser.Math.Vector2(0.937, 0.605),
    type: AcType.JET,
  },
  {
    name: 'MEMPA',
    relativeCoord: new Phaser.Math.Vector2(0.452, 0.375),
    type: AcType.PROP,
  },
  {
    name: 'MOBEL',
    relativeCoord: new Phaser.Math.Vector2(0.687, 0.554),
    type: AcType.JET,
  },
  {
    name: 'OMAPA',
    relativeCoord: new Phaser.Math.Vector2(0.581, 0.657),
    type: AcType.PROP,
  },
  {
    name: 'PERLO',
    relativeCoord: new Phaser.Math.Vector2(0.604, 0.564),
    type: AcType.PROP,
  },
  {
    name: 'PUTON',
    relativeCoord: new Phaser.Math.Vector2(0.947, 0.551),
    type: AcType.JET,
  },
  {
    name: 'SIDVU',
    relativeCoord: new Phaser.Math.Vector2(0.36, 0.362),
    type: AcType.PROP,
  },
  {
    name: 'VIDRA',
    relativeCoord: new Phaser.Math.Vector2(0.554, 0.702),
    type: AcType.JET,
  },
];

function genWaypointKeys(wpArr: WaypointData06s[]) {
  const wpKeys = wpArr.reduce((acc, item) => {
    acc[item.name] = {
      relativeCoord: item.relativeCoord,
      displayCoord: item.relativeCoord.scale(1080),
    };
    return acc;
  }, {} as WaypointKeys06s);

  return wpKeys;
}

export const Rwy06sWaypointKeys = genWaypointKeys(Rwy06sWaypointList);
