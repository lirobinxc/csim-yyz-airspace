import _ from 'lodash';
import { ACID, genACID } from '../genACID';
import { genCallsign } from '../genCallsign';

import { SidData } from '../../data/sidsCollection';
import { destinationCollection } from '../../data/destinationCollection';
import { SatelliteData } from '../../data/satelliteCollection';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { AcModel, AcType, AcWTC } from '../../../phaser/types/AircraftTypes';
import { SidName } from '../../../phaser/types/SidAndSatelliteTypes';
import { DepRunwayAll, DepRunwayYYZ } from '../../../phaser/types/AirportTypes';

import { AdjacentSectors } from '../../../phaser/types/SectorTypes';
import { WaypointDataDepCommon } from '../../../phaser/types/WaypointTypesDep';
import { WaypointDataArrAll } from '../../../phaser/types/WaypointTypesArr';
import { determineDepRunwayYYZ } from '../departure/determineDepRunway';
import { ArrBedpost, genArrRoute, StarName } from './genArrRoute';
import { getArrEntryAlt } from './getArrEntryAlt';
import { getArrEntrySpeed } from './getArrEntrySpeed';
import { WP_DICT_ARR_COMMON } from '../../../phaser/config/WaypointConfigArr/WaypointConfigArrCommon';
import { STAR_ROUTES_06s } from '../../../phaser/config/RouteConfigArr/RouteConfigStars06s';
import {
  ArrivalPhase,
  ArrivalPosition,
} from '../../../phaser/types/ArrivalTypes';
import { RecatGroup } from '../../../phaser/config/RecatSpacing';
import { PlanePerformanceConfig } from '../../../phaser/config/PlanePerformanceConfig';
import { STAR_ROUTES_24s } from '../../../phaser/config/RouteConfigArr/RouteConfigStars24s';
import RadarScene from '../../../phaser/scenes/RadarScene';
import { determineIfStraightInBedpost } from './determineIfStraightInBedpost';
import { determineArrBedpost } from './determineArrBedpost';
import { determineBedpostSector } from './determineBedpostSector';
import { STAR_ROUTES_33s } from '../../../phaser/config/RouteConfigArr/RouteConfigStars33s';
import { STAR_ROUTES_15s } from '../../../phaser/config/RouteConfigArr/RouteConfigStars15s';

let currentHour = _.sample([12, 13, 14, 15, 16, 17, 18]) || 12;
let currentMinute = 0;

export const ARR_RUNWAYS: {
  [key in RadarSceneKeys]: { [key in ArrivalPosition]: DepRunwayYYZ };
} = {
  Radar06sScene: {
    NORTH: DepRunwayYYZ.RWY_05,
    SOUTH: DepRunwayYYZ.RWY_06L,
  },
  Radar15sScene: {
    NORTH: DepRunwayYYZ.RWY_15L,
    SOUTH: DepRunwayYYZ.RWY_15R,
  },
  Radar24sScene: {
    NORTH: DepRunwayYYZ.RWY_23,
    SOUTH: DepRunwayYYZ.RWY_24R,
  },
  Radar33sScene: {
    NORTH: DepRunwayYYZ.RWY_33R,
    SOUTH: DepRunwayYYZ.RWY_33L,
  },
} as const;

export interface ArrFDE {
  uniqueKey: string;
  acId: { code: string; spoken: string };
  acModel: AcModel;
  acModelFull: string;
  acType: AcType;
  acWtc: AcWTC;
  arrBedpost: ArrBedpost;
  arrivalTime: number;
  arrPhase: ArrivalPhase;
  arrPosition: ArrivalPosition;
  arrRunway: DepRunwayYYZ;
  assignedAlt: number;
  assignedHeading: WaypointDataArrAll;
  assignedSpeed: number;
  debugACID: ACID;
  ETA: string;
  handoffSector: AdjacentSectors;
  isQ400: boolean;
  isStraightIn: boolean;
  recat: RecatGroup;
  starName: StarName;
  transponderCode: string;
}

export function genArrFDE(
  radarScene: RadarSceneKeys,
  isSingleOps: boolean,
  activeBedposts: ArrBedpost[],
  innerOnly: boolean,
  allowStraightIn: boolean,
  priorityBedpost: ArrBedpost | undefined
) {
  let newArrFde: ArrFDE = generate();

  if (allowStraightIn === false) {
    const REGEN_ATTEMPT_LIMIT = 20;
    let attempts = 0;
    while (newArrFde.isStraightIn && attempts < REGEN_ATTEMPT_LIMIT) {
      newArrFde = generate();
      attempts++;
    }
  }

  return newArrFde;

  function generate() {
    // Set timestamp
    const minuteJitter = _.sample([1, 1, 1, 1, 2, 2, 3]) || 1;
    currentMinute = currentMinute + minuteJitter;
    if (currentMinute > 59) {
      currentHour = currentHour + 1;
      currentMinute = currentMinute - 60;
    }

    if (currentHour > 23) currentHour = 0;

    const currentTime = `${String(currentHour).padStart(2, '0')}${String(
      currentMinute
    ).padStart(2, '0')}`;

    // Gen aircraft
    const aircraft = genACID({ allowC208: false });

    // Gen Callsign
    const isC208 = aircraft.model === AcModel.C208;
    let callsign = genCallsign({ isC208 });

    // Init route
    const starName = genArrRoute(
      aircraft.type,
      activeBedposts,
      priorityBedpost
    );

    // Arrival Bedpost & Sector
    const arrBedpost: ArrBedpost = determineArrBedpost(starName);
    const handoffSector = determineBedpostSector(arrBedpost);

    // Arrival position
    let arrPosition = ArrivalPosition.SOUTH;

    if (!isSingleOps) {
      let randomArrPosition = _.sample([
        ArrivalPosition.NORTH,
        ArrivalPosition.SOUTH,
      ]);
      if (!randomArrPosition) randomArrPosition = ArrivalPosition.SOUTH;

      switch (arrBedpost) {
        case ArrBedpost.BOXUM:
          if (
            radarScene === RadarSceneKeys.RADAR_06s ||
            radarScene === RadarSceneKeys.RADAR_24s
          ) {
            arrPosition = ArrivalPosition.NORTH;
          }
          if (
            radarScene === RadarSceneKeys.RADAR_15s ||
            radarScene === RadarSceneKeys.RADAR_33s
          ) {
            arrPosition = randomArrPosition;
          }
          break;
        case ArrBedpost.NUBER:
          if (
            radarScene === RadarSceneKeys.RADAR_06s ||
            radarScene === RadarSceneKeys.RADAR_24s
          ) {
            arrPosition = randomArrPosition;
          }
          if (
            radarScene === RadarSceneKeys.RADAR_15s ||
            radarScene === RadarSceneKeys.RADAR_33s
          ) {
            arrPosition = ArrivalPosition.SOUTH;
          }
          break;
        case ArrBedpost.LINNG:
          if (
            radarScene === RadarSceneKeys.RADAR_06s ||
            radarScene === RadarSceneKeys.RADAR_24s
          ) {
            arrPosition = ArrivalPosition.SOUTH;
          }
          if (
            radarScene === RadarSceneKeys.RADAR_15s ||
            radarScene === RadarSceneKeys.RADAR_33s
          ) {
            arrPosition = randomArrPosition;
          }
          break;
        case ArrBedpost.IMEBA:
          if (
            radarScene === RadarSceneKeys.RADAR_06s ||
            radarScene === RadarSceneKeys.RADAR_24s
          ) {
            arrPosition = randomArrPosition;
          }
          if (
            radarScene === RadarSceneKeys.RADAR_15s ||
            radarScene === RadarSceneKeys.RADAR_33s
          ) {
            arrPosition = ArrivalPosition.NORTH;
          }
          break;
        case ArrBedpost.RAGID:
          if (
            radarScene === RadarSceneKeys.RADAR_06s ||
            radarScene === RadarSceneKeys.RADAR_24s
          ) {
            arrPosition = randomArrPosition;
          }
          if (
            radarScene === RadarSceneKeys.RADAR_15s ||
            radarScene === RadarSceneKeys.RADAR_33s
          ) {
            arrPosition = ArrivalPosition.NORTH;
          }
          break;
      }
    }

    // Is Straight in?
    const isStraightIn = determineIfStraightInBedpost(radarScene, arrBedpost);

    // Arrival Runway
    const arrRunway = ARR_RUNWAYS[radarScene][arrPosition];

    // Assigned first waypoint
    let assignedHeading: WaypointDataArrAll; // WIP

    switch (radarScene) {
      case RadarSceneKeys.RADAR_06s:
        assignedHeading = STAR_ROUTES_06s[arrBedpost][arrPosition][0];
        break;
      case RadarSceneKeys.RADAR_24s:
        assignedHeading = STAR_ROUTES_24s[arrBedpost][arrPosition][0];
        break;
      case RadarSceneKeys.RADAR_33s:
        assignedHeading = STAR_ROUTES_33s[arrBedpost][arrPosition][0];
        break;
      case RadarSceneKeys.RADAR_15s:
        assignedHeading = STAR_ROUTES_15s[arrBedpost][arrPosition][0];
        break;
      default:
        throw new Error('Could not get 1st arrival waypoint');
    }

    // Entry altitude
    const assignedAlt = getArrEntryAlt(radarScene, starName);
    // Assigned entry speed
    const assignedSpeed = getArrEntrySpeed(radarScene, starName);

    // Transponder
    const transponderCode = `${_.random(0, 7)}${_.random(0, 7)}${_.random(
      0,
      7
    )}${_.random(0, 7)}`;

    const acModelFull = `${aircraft.wtc}/${aircraft.model}/${aircraft.equipment}`;

    const arrPhase = ArrivalPhase.PENDING;

    const recat = PlanePerformanceConfig[aircraft.model].recat;

    const arrFde: ArrFDE = {
      uniqueKey: `${callsign.fullCallsign}${Math.random().toFixed(5)}`,
      acId: { code: callsign.fullCallsign, spoken: callsign.spokenCallsign },
      acModel: aircraft.model,
      acModelFull,
      acType: aircraft.type,
      acWtc: aircraft.wtc,
      arrBedpost,
      arrivalTime: 0,
      arrPhase,
      arrPosition,
      arrRunway,
      assignedAlt: innerOnly && !isStraightIn ? 50 : assignedAlt,
      assignedHeading,
      assignedSpeed: innerOnly && !isStraightIn ? 210 : assignedSpeed,
      debugACID: aircraft,
      ETA: currentTime,
      handoffSector,
      isQ400: aircraft.isQ400,
      isStraightIn,
      recat,
      starName,
      transponderCode,
    };

    return arrFde;
  }
}
