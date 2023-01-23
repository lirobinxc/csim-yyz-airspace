import _ from 'lodash';
import { ACID, genACID } from '../genACID';
import { genCallsign } from '../genCallsign';
import { genDepRoute } from './genDepRoute';
import { SidData } from '../../data/sidsCollection';
import { destinationCollection } from '../../data/destinationCollection';
import { SatelliteData } from '../../data/satelliteCollection';
import { RadarSceneKeys } from '../../../phaser/types/SceneKeys';
import { AcModel, AcType, AcWTC } from '../../../phaser/types/AircraftTypes';
import { SidName } from '../../../phaser/types/SidAndSatelliteTypes';
import { DepRunwayAll } from '../../../phaser/types/AirportTypes';
import { determineIfNorthOrSouthDep } from './determineIfNorthOrSouthDep';
import { determineDepRunwayYYZ } from './determineDepRunway';
import { AdjacentSectors } from '../../../phaser/types/SectorTypes';
import { WaypointDataDepCommon } from '../../../phaser/types/WaypointTypesDep';
import { DeparturePhase, DeparturePosition } from './departureTypes';

let currentHour = _.sample([12, 13, 14, 15, 16, 17, 18]) || 12;
let currentMinute = 0;

export interface DepFDE {
  uniqueKey: string;
  acModelFull: string;
  acId: { code: string; spoken: string };
  acType: AcType;
  acModel: AcModel;
  acWtc: AcWTC;
  assignedAlt: number;
  assignedHeading: number | WaypointDataDepCommon | null;
  coordinatedAlt: number;
  debugACID: ACID;
  depPhase: DeparturePhase;
  depPoint: string;
  depPosition: DeparturePosition;
  depRunway: DepRunwayAll;
  destination: string;
  ETA: string;
  filedAlt: number;
  filedRoute: string;
  filedTAS: number;
  handoffAlt: number;
  handoffSector: AdjacentSectors;
  inPositionTime: number;
  isArrival: boolean;
  isNADP1: boolean;
  isQ400: boolean;
  isSatellite: boolean;
  isVDP: boolean;
  onCourseWP: string;
  remarks: string;
  satFdeData: SatelliteData;
  sidName: SidName;
  transponderCode: string;
}

export function genDepFDE(
  radarScene: RadarSceneKeys,
  isSingleOps: boolean,
  prevFdeSidName: SidName | undefined
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
  const aircraft = genACID();

  // Gen Callsign
  const isC208 = aircraft.model === AcModel.C208;
  let callsign = genCallsign({ isC208 });

  // Set filed speed and altitude
  let filedTAS = 999;
  let filedAlt = 999;
  if (aircraft.type === AcType.PROP) {
    filedTAS = _.sample([293, 275]) || 275;
    filedAlt = _.sample([60, 160, 190, 220, 250]) || 220;
    if (aircraft.model === AcModel.C208) {
      filedTAS = 180;
      filedAlt = _.sample([70, 80]) || 70;
    }
  }
  if (aircraft.type === AcType.JET) {
    filedTAS = _.sample([349, 374]) || 349;
    filedAlt = _.sample([210, 220, 310, 330, 350, 360]) || 350;
  }

  // Init route
  const sid = genDepRoute(radarScene, aircraft.type) || ({} as SidData);

  const sidName = sid.name;
  const filedRoute = `${sid.name.split(' ')[0]} ... ...`;

  // Assigned heading
  let assignedHeading =
    (sid.acType !== AcType.JET && sid['propOrJetTurns']) || null;

  // Init assigned altitude
  let assignedAlt = 30; // default PROP altitude
  if (!assignedHeading || sid.acType === AcType.JET) {
    assignedAlt = 50;
  } // default JET altitude

  const onCourseWP = sid['finalWp'];

  // Randomly select a destination
  const destination =
    _.sample(destinationCollection) || destinationCollection[0];

  const transponderCode = `${_.random(0, 7)}${_.random(0, 7)}${_.random(
    0,
    7
  )}${_.random(0, 7)}`;

  // Convert 'Handoff Alt' string to num
  let handoffAlt = 230;

  if (sid['handoffAlt'] === 'FL230') handoffAlt = 230;
  if (sid['handoffAlt'] === '15,000') handoffAlt = 150;
  if (sid['handoffAlt'] === '8000') handoffAlt = 80;

  let handoffSector = sid.handoffSector;

  const acModelFull = `${aircraft.wtc}/${aircraft.model}/${aircraft.equipment}`;

  const depPhase = DeparturePhase.READY;

  let depPosition = determineIfNorthOrSouthDep(radarScene, sidName);

  if (isSingleOps) {
    depPosition = DeparturePosition.SD;
  }

  const depRunway: DepRunwayAll = determineDepRunwayYYZ(
    radarScene,
    depPosition,
    isSingleOps
  );
  const inPositionTime = 0; // ms

  // const satRouteData = genSatFdeData(rwyId);

  const depFDE: DepFDE = {
    uniqueKey: `${callsign.fullCallsign}${Math.random().toFixed(5)}`,
    acModelFull,
    acId: { code: callsign.fullCallsign, spoken: callsign.spokenCallsign },
    acType: aircraft.type,
    acModel: aircraft.model,
    acWtc: aircraft.wtc,
    assignedAlt,
    assignedHeading,
    coordinatedAlt: 0,
    debugACID: aircraft,
    depPhase,
    depPoint: 'CYYZ',
    depPosition,
    depRunway,
    destination,
    ETA: currentTime,
    filedAlt,
    filedRoute,
    filedTAS,
    handoffAlt,
    handoffSector,
    isArrival: false,
    inPositionTime,
    isNADP1: false,
    isQ400: aircraft.isQ400,
    isSatellite: false,
    isVDP: false,
    onCourseWP,
    remarks: '',
    satFdeData: {} as SatelliteData,
    sidName: sidName,
    transponderCode,
  };

  return depFDE;
}
