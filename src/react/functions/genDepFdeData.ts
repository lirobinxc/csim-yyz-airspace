import _ from 'lodash';
import { genACID } from './genACID';
import { genCallsign } from './genCallsign';
import { genDepRoute } from './genDepRoute';
import { SidData } from '../data/sidsCollection';
import { destinationCollection } from '../data/destinationCollection';
import { SatelliteData } from '../data/satelliteCollection';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { AcModel, AcType } from '../../phaser/types/AircraftTypes';
import { SidName } from '../../phaser/types/SidTypes';
import { DepRunwayAll } from '../../phaser/types/AirportTypes';
import { determineIfNorthOrSouthDep } from './determineIfNorthOrSouthDep';
import { determineDepRunwayYYZ } from './determineDepRunway';
import { determineIfVdpAllowed } from './determineIfVdpAllowed';

export enum DeparturePhase {
  READY = 'READY',
  IN_POSITION = 'IN_POSITION',
  AIRBORNE = 'AIRBORNE',
  SATELLITE_PENDING = 'SATELLITE_PENDING',
}

export enum DeparturePosition {
  ND = 'ND',
  SD = 'SD',
}

let currentHour = _.sample([12, 13, 14, 15, 16, 17, 18]) || 12;
let currentMinute = 0;

export type DepFDE = ReturnType<typeof genDepFdeData>;

export function genDepFdeData(
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
  const callsign = genCallsign({ isC208 });

  // Set filed speed and altitude
  let filedTAS = 999;
  let filedAlt = 999;
  if (aircraft.type === AcType.PROP) {
    filedTAS = _.sample([293, 275]) || 275;
    filedAlt = _.sample([60, 160, 190, 220, 250]) || 220;
    if (aircraft.model === AcModel.C208) {
      filedTAS = 180;
      filedAlt = 80;
    }
  }
  if (aircraft.type === AcType.JET) {
    filedTAS = _.sample([349, 374]) || 349;
    filedAlt = _.sample([220, 310, 330, 350, 360]) || 350;
  }

  // Init route
  const sid = genDepRoute(radarScene, aircraft.type) || ({} as SidData);

  const sidName = sid.name;
  const filedRoute = `${sid.name} ... ...`;

  // Assigned heading
  let assignedHeading =
    (sid.acType !== AcType.JET && sid['propOrJetTurns']) || '';

  // Init assigned altitude
  let assignedAlt = 30; // default PROP altitude
  if (assignedHeading === 'No turns' || sid.acType === AcType.JET)
    assignedAlt = 50; // default JET altitude

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

  const acFullName = `${aircraft.wtc}/${aircraft.model}/${aircraft.equipment}`;

  let isVDP = _.random(1, 10) > 6;

  if (isVDP) {
    if (!prevFdeSidName) {
      isVDP = false;
    }
    if (determineIfVdpAllowed(radarScene, sidName, prevFdeSidName)) {
    }
  }

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

  const depFDE = {
    acFullName,
    acId: callsign.fullCallsign,
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
    inPositionTime,
    isNADP1: false,
    isQ400: aircraft.isQ400,
    isSatellite: false,
    isVDP,
    onCourseWP,
    remarks: '',
    satFdeData: {} as SatelliteData,
    sidName,
    transponderCode,
  };

  return depFDE;
}
