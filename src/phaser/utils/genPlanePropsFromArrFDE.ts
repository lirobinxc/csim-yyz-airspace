import { ArrFDE } from '../../react/functions/arrival/genArrFDE';
import { DepFDE } from '../../react/functions/departure/genDepFDE';
import { PlanePerformanceConfig } from '../config/PlanePerformanceConfig';
import { getRunwayHeading } from '../config/RunwayHeadingConfig';
import { AcType } from '../types/AircraftTypes';
import { DepRunwayYYZ } from '../types/AirportTypes';
import { PlaneProperties } from '../types/PlaneInterfaces';
import { RadarSceneKeys } from '../types/SceneKeys';
import { TerminalSectors } from '../types/SectorTypes';
import { TerminalPosition } from '../types/SimTypes';
import { getStarRoute } from './getStarRoute';

export function genPlanePropsFromArrFDE(arrFde: ArrFDE): PlaneProperties {
  const props: PlaneProperties = {
    acId: { code: arrFde.acId.code, spoken: arrFde.acId.spoken },
    acType: arrFde.acType,
    acModel: arrFde.acModel,
    acWtc: arrFde.acWtc,
    isSatellite: false,
    isSatArrival: false,
    terminalPosition: TerminalPosition.ARRIVAL,
    // Dummy data (unused on ArrFDEs)
    filedData: {
      sidName: null,
      satelliteName: null,
      alt: arrFde.assignedAlt * 100,
      speed: PlanePerformanceConfig[arrFde.acModel].speed.maxCruise,
      destination: 'CYYZ',
    },
    // Dummy data (unused on ArrFDEs)
    takeoffData: {
      assignedAlt: 0,
      assignedHeading: 0,
      sidOrPropTurnHeading: null,
      depRunway: DepRunwayYYZ.RWY_05,
      isNADP1: false,
    },
    arrivalData: {
      assignedAlt: arrFde.assignedAlt * 100,
      assignedSpeed: arrFde.assignedSpeed,
      assignedHeading: arrFde.assignedHeading,
      arrBedpost: arrFde.arrBedpost,
      arrPosition: arrFde.arrPosition,
      arrRunway: arrFde.arrRunway,
    },
    handoffData: {
      alt: 0 * 100,
      sector: arrFde.handoffSector,
    },
  };

  return props;
}
