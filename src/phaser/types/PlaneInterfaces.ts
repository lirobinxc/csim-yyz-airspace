import { AcModel, AcType, AcWTC } from './AircraftTypes';
import { DepRunwayAll } from './AirportTypes';
import { AdjacentSectors, TerminalSectors } from './SectorTypes';
import { SatelliteName, SidName } from './SidAndSatelliteTypes';
import { WaypointDataAll, WaypointDataCommon } from './WaypointTypes';

export interface PlaneProperties {
  acId: { code: string; spoken: string };
  acType: AcType;
  acModel: AcModel;
  acWtc: AcWTC;
  isSatellite: boolean;
  isArrival: boolean;
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
    sidOrPropTurnHeading: number | WaypointDataCommon | null;
    depRunway: DepRunwayAll;
    isNADP1: boolean;
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
    directTo: WaypointDataAll | null;
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
