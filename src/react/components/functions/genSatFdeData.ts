import _ from 'lodash';
import { AcType, genACID } from './genACID';
import { genCallsign } from './genCallsign';
import { RunwayId } from '../data/sidsCollection';
import { destinationCollection } from '../data/destinationCollection';
import { genSatRoute } from './genSatRoute';
import { SatelliteData } from '../data/satelliteCollection';

let currentHour = _.sample([12, 13, 14, 15, 16, 17, 18]) || 12;
let currentMinute = 0;

export type SatFDE = ReturnType<typeof genSatFdeData>;

export function genSatFdeData(rwyId: RunwayId) {
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

  // Gen route
  let route = genSatRoute(rwyId, aircraft.type) || ({} as SatelliteData);
  while (route.isRare) {
    if (_.random(1, 100) > 95) break;

    route = genSatRoute(rwyId, aircraft.type) || ({} as SatelliteData);
  }

  const satType = route.SatType;
  const isArrival = satType === 'Arrival';
  const isDeparture = satType === 'Departure';
  const isOverflight = satType === 'Overflight';

  // Gen Callsign
  const isC208 = aircraft.model === 'C208';
  const isSatYTZ = route.DeparturePoint === 'CYTZ';
  const isSatYKZ = route.DeparturePoint === 'CYKZ';
  const callsign = genCallsign({ isC208, isSatYTZ, isSatYKZ });

  // Set filed speed and altitude
  let filedTAS = 999;
  let filedAlt = 999;
  if (aircraft.type === AcType.Prop) {
    filedTAS = _.sample([290, 275]) || 275;
    filedAlt = _.sample([60, 160, 190, 220, 250]) || 220;
    if (aircraft.model === 'C208') {
      filedTAS = 180;
      filedAlt = 80;
    }
  }
  if (aircraft.type === AcType.Jet) {
    filedTAS = _.sample([350, 375]) || 349;
    filedAlt = _.sample([220, 310, 330, 350, 360]) || 350;
  }

  // Init Rwy ID
  function randomRwyId(): string {
    let randomRwy: string | undefined = '';

    if (rwyId === RunwayId['05, 06LR']) randomRwy = _.sample(['06L']);
    if (rwyId === RunwayId['15LR']) randomRwy = _.sample(['15L']);
    if (rwyId === RunwayId['23, 24LR']) randomRwy = _.sample(['24R']);
    if (rwyId === RunwayId['33LR']) randomRwy = _.sample(['33R']);

    return randomRwy || 'ERROR';
  }

  const yyzRunwayId = randomRwyId();

  const filedRoute = route.Route;

  // Assigned heading
  let assignedHeading = route.EntryHeading;

  // Init assigned altitude
  let assignedAlt = Number(route.EntryAltitude) || 0;

  // Randomly select a destination
  let destination = _.sample(destinationCollection) || destinationCollection[0];

  if (isArrival || route.Destination) {
    destination = route.Destination;
  }
  const transponderCode = `${_.random(0, 7)}${_.random(0, 7)}${_.random(
    0,
    7
  )}${_.random(0, 7)}`;

  // Convert 'Handoff Alt' string to num
  let handoffAlt = Number(route.ExitAltitude) || 0;

  const acFullName = `${aircraft.wtc}/${aircraft.model}/${aircraft.equipment}`;

  const satFDE = {
    acFullName,
    acId: callsign.fullCallsign,
    acType: aircraft.type,
    assignedAlt,
    assignedHeading,
    coordinatedAlt: 0,
    debugACID: aircraft,
    departurePoint: route.DeparturePoint,
    destination,
    ETA: currentTime,
    filedAlt,
    filedRoute,
    filedTAS,
    handoffAlt,
    isNADP1: false,
    isQ400: aircraft.isQ400,
    isSatellite: true,
    onCourseWP: route.ExitHeading,
    remarks: '',
    satFdeData: route,
    transponderCode,
    yyzRunwayId,
    isVDP: false,
  };

  return satFDE;
}
