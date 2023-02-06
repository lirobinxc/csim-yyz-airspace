import { DepRunwayYYZ } from '../types/AirportTypes';

export function convertArrivalRunwayToSfi(rwy: DepRunwayYYZ) {
  switch (rwy) {
    case DepRunwayYYZ.RWY_05:
      return 'N';
    case DepRunwayYYZ.RWY_23:
      return 'N';
    case DepRunwayYYZ.RWY_06L:
      return 'L';
    case DepRunwayYYZ.RWY_15L:
      return 'L';
    case DepRunwayYYZ.RWY_33L:
      return 'L';
    case DepRunwayYYZ.RWY_15R:
      return 'R';
    case DepRunwayYYZ.RWY_24R:
      return 'R';
    case DepRunwayYYZ.RWY_33R:
      return 'R';
  }
}
