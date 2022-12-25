import { AcType } from '../../types/AircraftTypes';
import type { WaypointDataCommon } from './WaypointsCollection';

export const CommonWaypointList: WaypointDataCommon[] = [
  {
    name: 'ANCOL',
    relativeCoord: new Phaser.Math.Vector2(0.201, 0.899),
    type: AcType.Jet,
  },
];
