import { DepRunwayAll, DepRunwayYYZ } from '../types/AirportTypes';

export function getRunwayHeading(runway: DepRunwayAll) {
  switch (runway) {
    // YYZ
    case DepRunwayYYZ.RWY_05:
      return { initial: 57, sid: 47 };
    case DepRunwayYYZ.RWY_06L:
      return { initial: 57, sid: 57 };
    case DepRunwayYYZ.RWY_15L:
      return { initial: 147, sid: 147 };
    case DepRunwayYYZ.RWY_15R:
      return { initial: 147, sid: 147 };
    case DepRunwayYYZ.RWY_23:
      return { initial: 237, sid: 245 };
    case DepRunwayYYZ.RWY_24R:
      return { initial: 237, sid: 235 };
    case DepRunwayYYZ.RWY_33L:
      return { initial: 327, sid: 345 };
    case DepRunwayYYZ.RWY_33R:
      return { initial: 327, sid: 340 };
    default:
      throw new Error(`No RunwayHeading data found for: ${runway}`);
  }
}
