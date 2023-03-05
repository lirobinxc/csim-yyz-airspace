import {
  DepRunwayAll,
  DepRunwaySatArrivals,
  DepRunwayYHM,
  DepRunwayYKF,
  DepRunwayYKZ,
  DepRunwayYTZ,
  DepRunwayYYZ,
  DepRunwayYZD,
} from '../types/AirportTypes';

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
    // YHM
    case DepRunwayYHM.RWY_12:
      return { initial: 120, sid: 120 };
    case DepRunwayYHM.RWY_30:
      return { initial: 300, sid: 300 };
    // YKF
    case DepRunwayYKF.RWY_08:
      return { initial: 80, sid: 80 };
    case DepRunwayYKF.RWY_26:
      return { initial: 260, sid: 260 };
    // YKZ
    case DepRunwayYKZ.RWY_15:
      return { initial: 147, sid: 147 };
    case DepRunwayYKZ.RWY_33:
      return { initial: 330, sid: 330 };
    // YZD
    case DepRunwayYZD.RWY_15:
      return { initial: 147, sid: 147 };
    case DepRunwayYZD.RWY_33:
      return { initial: 330, sid: 330 };
    // YTZ
    case DepRunwayYTZ.RWY_08:
      return { initial: 80, sid: 80 };
    case DepRunwayYTZ.RWY_26:
      return { initial: 237, sid: 237 };
    // SatArrivals
    case DepRunwaySatArrivals.YHM:
      return { initial: 240, sid: 240 };
    case DepRunwaySatArrivals.YKZ_YOO_YPQ:
      return { initial: 60, sid: 60 };
    default:
      throw new Error(`No RunwayHeading data found for: ${runway}`);
  }
}
