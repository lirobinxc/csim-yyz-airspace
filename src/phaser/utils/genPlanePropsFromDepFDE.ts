import { ArrivalPosition } from '../../react/functions/arrival/arrivalTypes';
import { ArrFDE } from '../../react/functions/arrival/genArrFDE';
import { DepFDE } from '../../react/functions/departure/genDepFDE';
import { PlanePerformanceConfig } from '../config/PlanePerformanceConfig';
import { getRunwayHeading } from '../config/RunwayHeadingConfig';
import { WP_DICT_ARR_COMMON } from '../config/WaypointConfigArr/WaypointConfigArrCommon';
import { AcType } from '../types/AircraftTypes';
import { PlaneProperties } from '../types/PlaneInterfaces';
import {
  ArrBedpost,
  StarName,
} from '../../react/functions/arrival/genArrRoute';
import { TerminalPosition } from '../types/SimTypes';
import { DepRunwayYYZ } from '../types/AirportTypes';

export function genPlanePropsFromDepFDE(depFde: DepFDE): PlaneProperties {
  const props: PlaneProperties = {
    fdeData: { dep: depFde, arr: null },
    acId: { code: depFde.acId.code, spoken: depFde.acId.spoken },
    acType: depFde.acType,
    acModel: depFde.acModel,
    acWtc: depFde.acWtc,
    isSatellite: depFde.isSatellite,
    isSatArrival: depFde.isArrival,
    terminalPosition: TerminalPosition.DEPARTURE,
    filedData: {
      sidName: depFde.isSatellite ? null : depFde.sidName,
      satelliteName: depFde.isSatellite ? depFde.satFdeData.name : null,
      alt: depFde.assignedAlt * 100,
      speed: PlanePerformanceConfig[depFde.acModel].speed.maxCruise,
      destination: depFde.destination,
    },
    takeoffData: {
      assignedAlt: depFde.assignedAlt * 100,
      assignedHeading: getRunwayHeading(depFde.depRunway).initial,
      sidOrPropTurnHeading: getSidOrPropTurnHeading(depFde),
      depRunway: depFde.depRunway,
      isNADP1: depFde.isNADP1,
    },
    // Dummy data (unused on DepFDEs)
    arrivalData: {
      assignedAlt: 0,
      assignedSpeed: 0,
      assignedHeading: WP_DICT_ARR_COMMON.BOXUM,
      arrBedpost: ArrBedpost.BOXUM,
      arrPosition: ArrivalPosition.NORTH,
      arrRunway: DepRunwayYYZ.RWY_05,
    },
    handoffData: {
      alt: depFde.handoffAlt * 100,
      sector: depFde.handoffSector,
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
