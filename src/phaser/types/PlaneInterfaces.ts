import { ArrivalPosition } from '../../react/functions/arrival/arrivalTypes';
import { ArrFDE } from '../../react/functions/arrival/genArrFDE';
import { ArrBedpost } from '../../react/functions/arrival/genArrRoute';
import { DepFDE } from '../../react/functions/departure/genDepFDE';
import { AcModel, AcType, AcWTC } from './AircraftTypes';
import { DepRunwayAll } from './AirportTypes';
import { AdjacentSectors, TerminalSectors } from './SectorTypes';
import { SatelliteName, SidName } from './SidAndSatelliteTypes';
import { TerminalPosition } from './SimTypes';
import { WaypointDataArrAll } from './WaypointTypesArr';
import { WaypointDataDepAll, WaypointDataDepCommon } from './WaypointTypesDep';

export interface PlaneProperties {
  acId: { code: string; spoken: string };
  acType: AcType;
  acModel: AcModel;
  acWtc: AcWTC;
  isSatellite: boolean;
  isSatArrival: boolean;
  terminalPosition: TerminalPosition;
  filedData: {
    sidName: SidName | null;
    satelliteName: SatelliteName | null;
    alt: number;
    speed: number;
    destination: string;
  };
  takeoffData: {
    assignedAlt: number;
    assignedHeading: number;
    sidOrPropTurnHeading: number | WaypointDataDepCommon | null;
    depRunway: DepRunwayAll;
    isNADP1: boolean;
  };
  arrivalData: {
    assignedAlt: number;
    assignedSpeed: number;
    assignedHeading: WaypointDataArrAll;
    arrBedpost: ArrBedpost;
    arrPosition: ArrivalPosition;
  };
  handoffData: {
    alt: number;
    sector: TerminalSectors | AdjacentSectors;
  };
}

export interface PlanePerformance {
  speed: {
    initialClimb: number; // to 5000 feet
    normalClimb: number; // 5000 to FL240
    maxCruise: number;
    maxBelow10k: number;
  };
  climbRate: {
    initialClimb: number;
    normalClimb: number;
  };
  accel: number;
}

export interface PlaneCommands {
  speed: {
    current: number;
    assigned: number;
  };
  altitude: {
    current: number;
    assigned: number;
  };
  heading: {
    current: number;
    assigned: number;
    directTo: WaypointDataDepAll | WaypointDataArrAll | null;
  };
  climbRate: {
    current: number;
    assigned: number;
  };
  isClimbing: boolean;
  isDescending: boolean;
  onSidOrPropHeading: boolean;
  hasCheckedIn: boolean;
}
