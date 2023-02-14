import { ArrivalPosition } from '../types/ArrivalTypes';
import { DepRunwayYYZ } from '../types/AirportTypes';

export const IaToolHeadings: {
  [key in DepRunwayYYZ]: {
    [key in ArrivalPosition]: { base: number; intercept: number };
  };
} = {
  'YYZ Rwy 05': {
    NORTH: { base: 150, intercept: 90 },
    SOUTH: { base: 330, intercept: 30 },
  },
  'YYZ Rwy 06L': {
    NORTH: { base: 150, intercept: 90 },
    SOUTH: { base: 330, intercept: 30 },
  },
  'YYZ Rwy 15L': {
    NORTH: { base: 240, intercept: 180 },
    SOUTH: { base: 60, intercept: 120 },
  },
  'YYZ Rwy 15R': {
    NORTH: { base: 240, intercept: 180 },
    SOUTH: { base: 60, intercept: 120 },
  },
  'YYZ Rwy 23': {
    NORTH: { base: 150, intercept: 210 },
    SOUTH: { base: 330, intercept: 270 },
  },
  'YYZ Rwy 24R': {
    NORTH: { base: 150, intercept: 210 },
    SOUTH: { base: 330, intercept: 270 },
  },
  'YYZ Rwy 33L': {
    NORTH: { base: 240, intercept: 300 },
    SOUTH: { base: 60, intercept: 360 },
  },
  'YYZ Rwy 33R': {
    NORTH: { base: 240, intercept: 300 },
    SOUTH: { base: 60, intercept: 360 },
  },
};
