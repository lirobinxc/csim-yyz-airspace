import { AcType } from '../types/AircraftTypes';
import { CommonWaypointList } from './shared/CommonWaypoints';
import type {
  WaypointData06s,
  WaypointKeys06s,
} from './shared/WaypointsCollection';

export const Rwy06sWaypointList: WaypointData06s[] = [
  ...CommonWaypointList,
  {
    name: 'KEDSI',
    relativeCoord: new Phaser.Math.Vector2(0.509, 0.333),
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
