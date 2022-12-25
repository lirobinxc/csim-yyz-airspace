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
    type: AcType.Jet,
  },
  {
    name: 'AVROS',
    relativeCoord: new Phaser.Math.Vector2(0.925, 0.424),
    type: AcType.Prop,
  },
  {
    name: 'BIRLI',
    relativeCoord: new Phaser.Math.Vector2(0.609, 0.652),
    type: AcType.Jet,
  },
  {
    name: 'DUVKO',
    relativeCoord: new Phaser.Math.Vector2(0.348, 0.336),
    type: AcType.Jet,
  },
  {
    name: 'GOTIM',
    relativeCoord: new Phaser.Math.Vector2(0.576, 0.279),
    type: AcType.Jet,
  },
  {
    name: 'KEDSI',
    relativeCoord: new Phaser.Math.Vector2(0.509, 0.333),
    type: AcType.Jet,
  },
  {
    name: 'KODAL',
    relativeCoord: new Phaser.Math.Vector2(0.937, 0.605),
    type: AcType.Jet,
  },
  {
    name: 'MEMPA',
    relativeCoord: new Phaser.Math.Vector2(0.452, 0.375),
    type: AcType.Prop,
  },
  {
    name: 'MOBEL',
    relativeCoord: new Phaser.Math.Vector2(0.687, 0.554),
    type: AcType.Jet,
  },
  {
    name: 'OMAPA',
    relativeCoord: new Phaser.Math.Vector2(0.581, 0.657),
    type: AcType.Prop,
  },
  {
    name: 'PERLO',
    relativeCoord: new Phaser.Math.Vector2(0.604, 0.564),
    type: AcType.Prop,
  },
  {
    name: 'PUTON',
    relativeCoord: new Phaser.Math.Vector2(0.947, 0.551),
    type: AcType.Jet,
  },
  {
    name: 'SIDVU',
    relativeCoord: new Phaser.Math.Vector2(0.36, 0.362),
    type: AcType.Prop,
  },
  {
    name: 'VIDRA',
    relativeCoord: new Phaser.Math.Vector2(0.554, 0.702),
    type: AcType.Jet,
  },
];

function genWaypointKeys(wpArr: WaypointData06s[]) {
  const wpKeys = wpArr.reduce((acc, item) => {
    acc[item.name] = item.relativeCoord;
    return acc;
  }, {} as WaypointKeys06s);

  return wpKeys;
}

export const Rwy06sWaypointKeys = genWaypointKeys(Rwy06sWaypointList);
