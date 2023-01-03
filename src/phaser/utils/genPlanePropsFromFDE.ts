import { DepFDE } from '../../react/functions/genDepFdeData';
import { PlanePerformanceConfig } from '../config/PlanePerformanceConfig';
import { getRunwayHeading } from '../config/RunwayHeadingConfig';
import { PlaneProperties } from '../types/PlaneInterfaces';

export function genPlanePropsFromFDE(fde: DepFDE): PlaneProperties {
  const props: PlaneProperties = {
    acId: { abbrev: fde.acId, spoken: fde.acId },
    acType: fde.acType,
    acModel: fde.acModel,
    acWtc: fde.acWtc,
    filedData: {
      sidName: fde.sidName,
      alt: fde.assignedAlt * 100,
      speed: PlanePerformanceConfig[fde.acModel].speed.maxCruise,
      destination: fde.destination,
    },
    takeoffData: {
      assignedAlt: fde.assignedAlt * 100,
      assignedHeading: getRunwayHeading(fde.depRunway).initial,
      propTurnHeading: Number(fde.assignedHeading) || null,
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
