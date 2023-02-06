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
import { ArrivalPhase, ArrivalPosition } from './arrivalTypes';

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
  starName: StarName;
  transponderCode: string;
}

export function genArrFDE(
  radarScene: RadarSceneKeys,
  isSingleOps: boolean,
  activeBedposts: ArrBedpost[]
) {
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
  const starName = genArrRoute(aircraft.type, activeBedposts);

  // Arrival position
  let arrPosition = ArrivalPosition.NORTH;

  if (!isSingleOps) {
    let randomArrPosition = _.sample([
      ArrivalPosition.NORTH,
      ArrivalPosition.SOUTH,
    ]);
    if (!randomArrPosition) randomArrPosition = ArrivalPosition.SOUTH;

    switch (starName) {
      case StarName.LINNG:
        arrPosition = ArrivalPosition.SOUTH;
        break;
      case StarName.VERKO:
        arrPosition = ArrivalPosition.SOUTH;
        break;
      case StarName.IMEBA:
        arrPosition = randomArrPosition;
        break;
      case StarName.VIBLI:
        arrPosition = randomArrPosition;
        break;
      case StarName.RAGID:
        arrPosition = randomArrPosition;
        break;
      case StarName.UDNOX:
        arrPosition = randomArrPosition;
        break;
    }
  }

  // Arrival Bedpost & Sector
  let arrBedpost: ArrBedpost = ArrBedpost.BOXUM;
  let handoffSector = AdjacentSectors.ER;

  switch (starName) {
    case StarName.BOXUM:
      arrBedpost = ArrBedpost.BOXUM;
      handoffSector = AdjacentSectors.VV;
      break;
    case StarName.DUVOS:
      arrBedpost = ArrBedpost.BOXUM;
      handoffSector = AdjacentSectors.VV;
      break;
    case StarName.NUBER:
      arrBedpost = ArrBedpost.NUBER;
      handoffSector = AdjacentSectors.KF;
      break;
    case StarName.NAKBO:
      arrBedpost = ArrBedpost.NUBER;
      handoffSector = AdjacentSectors.KF;
      break;
    case StarName.LINNG:
      arrBedpost = ArrBedpost.LINNG;
      handoffSector = AdjacentSectors.GR;
      break;
    case StarName.VERKO:
      arrBedpost = ArrBedpost.LINNG;
      handoffSector = AdjacentSectors.GR;
      break;
    case StarName.IMEBA:
      arrBedpost = ArrBedpost.IMEBA;
      handoffSector = AdjacentSectors.SI;
      break;
    case StarName.VIBLI:
      arrBedpost = ArrBedpost.IMEBA;
      handoffSector = AdjacentSectors.SI;
      break;
    case StarName.RAGID:
      arrBedpost = ArrBedpost.RAGID;
      handoffSector = AdjacentSectors.SI;
      break;
    case StarName.UDNOX:
      arrBedpost = ArrBedpost.RAGID;
      handoffSector = AdjacentSectors.SI;
      break;
  }

  // Is Straight in?
  let isStraightIn = false;
  switch (radarScene) {
    case RadarSceneKeys.RADAR_06s:
      if (arrBedpost === ArrBedpost.NUBER) {
        isStraightIn = true;
      }
      break;
    case RadarSceneKeys.RADAR_15s:
      if (arrBedpost === ArrBedpost.BOXUM) {
        isStraightIn = true;
      }
      break;
    case RadarSceneKeys.RADAR_24s:
      if (arrBedpost === ArrBedpost.IMEBA || arrBedpost === ArrBedpost.RAGID) {
        isStraightIn = true;
      }
      break;
    case RadarSceneKeys.RADAR_33s:
      if (arrBedpost === ArrBedpost.LINNG) {
        isStraightIn = true;
      }
      break;
  }

  // Arrival Runway
  const arrRunway = ARR_RUNWAYS[radarScene][arrPosition];

  // Assigned first waypoint
  let assignedHeading: WaypointDataArrAll = WP_DICT_ARR_COMMON.ERBUS; // WIP

  switch (radarScene) {
    case RadarSceneKeys.RADAR_06s:
      assignedHeading = STAR_ROUTES_06s[arrBedpost][arrPosition][0];
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
    assignedAlt,
    assignedHeading,
    assignedSpeed,
    debugACID: aircraft,
    ETA: currentTime,
    handoffSector,
    isQ400: aircraft.isQ400,
    isStraightIn,
    starName,
    transponderCode,
  };

  return arrFde;
}
