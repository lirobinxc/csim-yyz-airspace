import { DepRunwayAll, DepRunwayYYZ } from '../types/AircraftTypes';

export function getRunwayHeading(runway: DepRunwayAll) {
  switch (runway) {
    // YYZ
    case DepRunwayYYZ.RWY_05:
      return { current: 57, assigned: 47 };
    case DepRunwayYYZ.RWY_06L:
      return { current: 57, assigned: 57 };
    case DepRunwayYYZ.RWY_15L:
      return { current: 147, assigned: 147 };
    case DepRunwayYYZ.RWY_15R:
      return { current: 147, assigned: 147 };
    case DepRunwayYYZ.RWY_23:
      return { current: 237, assigned: 245 };
    case DepRunwayYYZ.RWY_24R:
      return { current: 237, assigned: 235 };
    case DepRunwayYYZ.RWY_33L:
      return { current: 327, assigned: 345 };
    case DepRunwayYYZ.RWY_33R:
      return { current: 327, assigned: 340 };
    default:
      throw new Error(`No RunwayHeading data found for: ${runway}`);
  }
}
