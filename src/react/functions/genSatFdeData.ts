import _ from 'lodash';
import { genACID } from './genACID';
import { genCallsign } from './genCallsign';
import { destinationCollection } from '../data/destinationCollection';
import { genSatRoute } from './genSatRoute';
import { SatelliteData } from '../data/satelliteCollection';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { AcModel, AcType, AcWTC } from '../../phaser/types/AircraftTypes';
import {
  DeparturePhase,
  DeparturePosition,
  DepFDE,
  genDepFdeData,
} from './genDepFdeData';
import { SatelliteName } from '../../phaser/types/SidAndSatelliteTypes';

export function genSatFdeData(radarScene: RadarSceneKeys): DepFDE {
  const tempDepRoute = genDepFdeData(radarScene, false, undefined);

  const acType = tempDepRoute.acType;

  // Gen sat route
  const satRoute = genSatRoute(radarScene, acType) || ({} as SatelliteData);

  // If C208, convert to DH8D
  if (tempDepRoute.acModel === AcModel.C208) {
    tempDepRoute.acType = AcType.PROP;
    tempDepRoute.acModel = AcModel.DH8D;
    tempDepRoute.acWtc = AcWTC.M;
    tempDepRoute.isQ400 = true;
    tempDepRoute.filedAlt = _.sample([160, 210, 250, 250, 260]) || 250;
    tempDepRoute.acModelFull = `M/DH8D/R`;
  }
  if (tempDepRoute.acWtc === AcWTC.H) {
    tempDepRoute.acType = AcType.JET;
    tempDepRoute.acModel = AcModel.C56X;
    tempDepRoute.acWtc = AcWTC.M;
    tempDepRoute.isQ400 = false;
    tempDepRoute.filedAlt = _.sample([210, 250, 250, 260]) || 250;
    tempDepRoute.acModelFull = `M/C56X/R`;
  }

  // Fix callsign
  const isC208 = false;
  const isSatYkzDep = satRoute.depPoint === 'CYKZ';
  const isSatYtzDep = satRoute.depPoint === 'CYTZ';
  const isSatYhmAll =
    satRoute.depPoint === 'CYHM' || satRoute.destination === 'CYHM';
  const isSatYzdAll =
    satRoute.depPoint === 'CYZD' || satRoute.destination === 'CYZD';

  const newCallsign = genCallsign({
    isC208,
    isSatYkzDep,
    isSatYtzDep,
    isSatYhmAll,
    isSatYzdAll,
  });
  tempDepRoute.uniqueKey = `${newCallsign.fullCallsign}${Math.random().toFixed(
    5
  )}`;
  tempDepRoute.acId = {
    code: newCallsign.fullCallsign,
    spoken: newCallsign.spokenCallsign,
  };

  // Fix handoff alt
  let newHandoffAlt = tempDepRoute.handoffAlt;
  if (
    satRoute.name === SatelliteName.YTZ_DEP_IKLEN ||
    satRoute.name === SatelliteName.YKF_DEP_DAVSI ||
    satRoute.name === SatelliteName.YTZ_DEP_DAVSI
  ) {
    newHandoffAlt = Math.min(tempDepRoute.filedAlt, 230);
  }

  // isArrival?
  const isArrival = satRoute.name.split('_')[1] === 'ARR';

  return {
    ...tempDepRoute,
    assignedAlt: satRoute.entryAltitude,
    assignedHeading: satRoute.entryHeading,
    depPhase: DeparturePhase.SATELLITE_PENDING,
    depPoint: satRoute.depPoint,
    depPosition: DeparturePosition.SD,
    depRunway: satRoute.depRunway,
    destination: satRoute.destination,
    filedRoute: satRoute.depRoute,
    handoffAlt: newHandoffAlt,
    handoffSector: satRoute.handoffSector,
    isArrival,
    isNADP1: false,
    isSatellite: true,
    isVDP: false,
    onCourseWP: '',
    remarks: '',
    satFdeData: satRoute,
  };
}
