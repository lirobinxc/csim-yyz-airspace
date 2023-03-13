import { ArrivalPosition } from '../types/ArrivalTypes';
import { DepRunwayYYZ } from '../types/AirportTypes';

export const IaToolHeadings: {
  [key in DepRunwayYYZ]: {
    [key in ArrivalPosition]: {
      downwind: number;
      base: number;
      intercept: number;
    };
  };
} = {
  'YYZ Rwy 05': {
    NORTH: { downwind: 240, base: 150, intercept: 90 },
    SOUTH: { downwind: 240, base: 330, intercept: 30 },
  },
  'YYZ Rwy 06L': {
    NORTH: { downwind: 240, base: 150, intercept: 90 },
    SOUTH: { downwind: 240, base: 330, intercept: 30 },
  },
  'YYZ Rwy 15L': {
    NORTH: { downwind: 330, base: 240, intercept: 180 },
    SOUTH: { downwind: 330, base: 60, intercept: 120 },
  },
  'YYZ Rwy 15R': {
    NORTH: { downwind: 330, base: 240, intercept: 180 },
    SOUTH: { downwind: 330, base: 60, intercept: 120 },
  },
  'YYZ Rwy 23': {
    NORTH: { downwind: 60, base: 150, intercept: 210 },
    SOUTH: { downwind: 60, base: 330, intercept: 270 },
  },
  'YYZ Rwy 24R': {
    NORTH: { downwind: 60, base: 150, intercept: 210 },
    SOUTH: { downwind: 60, base: 330, intercept: 270 },
  },
  'YYZ Rwy 33L': {
    NORTH: { downwind: 150, base: 240, intercept: 300 },
    SOUTH: { downwind: 150, base: 60, intercept: 360 },
  },
  'YYZ Rwy 33R': {
    NORTH: { downwind: 150, base: 240, intercept: 300 },
    SOUTH: { downwind: 150, base: 60, intercept: 360 },
  },
};
