import { DepFDE } from '../../react/functions/genDepFdeData';
import { PlanePerformanceConfig } from '../config/PlanePerformanceConfig';
import { getRunwayHeading } from '../config/RunwayHeadingConfig';
import { AcType } from '../types/AircraftTypes';
import { PlaneProperties } from '../types/PlaneInterfaces';

export function genPlanePropsFromFDE(fde: DepFDE): PlaneProperties {
  const props: PlaneProperties = {
    acId: { code: fde.acId.code, spoken: fde.acId.spoken },
    acType: fde.acType,
    acModel: fde.acModel,
    acWtc: fde.acWtc,
    isSatellite: fde.isSatellite,
    filedData: {
      sidName: fde.isSatellite ? null : fde.sidName,
      satelliteName: fde.isSatellite ? fde.satFdeData.name : null,
      alt: fde.assignedAlt * 100,
      speed: PlanePerformanceConfig[fde.acModel].speed.maxCruise,
      destination: fde.destination,
    },
    takeoffData: {
      assignedAlt: fde.assignedAlt * 100,
      assignedHeading: getRunwayHeading(fde.depRunway).initial,
      sidOrPropTurnHeading: getSidOrPropTurnHeading(fde),
      depRunway: fde.depRunway,
      isNADP1: fde.isNADP1,
    },
    handoffData: {
      alt: fde.handoffAlt * 100,
      sector: fde.handoffSector,
    },
  };

  return props;
}

function getSidOrPropTurnHeading(fde: DepFDE) {
  if (fde.acType === AcType.PROP || fde.isSatellite) {
    return fde.assignedHeading;
  }

  return getRunwayHeading(fde.depRunway).sid;
}
