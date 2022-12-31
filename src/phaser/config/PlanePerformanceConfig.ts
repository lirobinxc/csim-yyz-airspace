import { PlanePerformance } from '../objects/Plane/Plane';
import { AcModel } from '../types/AircraftTypes';

const BASE_ACCEL = 3; // kts per second

// NOTE: Initial Climb rates should be MINIMUM 2000.

export const PlanePerformanceConfig: {
  [key in AcModel]: PlanePerformance;
} = {
  A21N: {
    speed: {
      initialClimb: 150, // kts, to 800 feet
      normalClimb: 210, // kts, 800 to FL240
      maxCruise: 360,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2000, // feet per minute
      normalClimb: 1500,
    },
    accel: BASE_ACCEL,
  },
  A343: {
    speed: {
      initialClimb: 175, // to 800 feet
      normalClimb: 290, // 800 to FL240
      maxCruise: 490,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2000, // feet per minute
      normalClimb: 1500,
    },
    accel: BASE_ACCEL,
  },
  B738: {
    speed: {
      initialClimb: 165, // to 800 feet
      normalClimb: 290, // 800 to FL240
      maxCruise: 460,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 3000, // feet per minute
      normalClimb: 2000,
    },
    accel: BASE_ACCEL,
  },
  DH8D: {
    speed: {
      initialClimb: 150, // to 800 feet
      normalClimb: 210, // 800 to FL240
      maxCruise: 270,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 3000, // feet per minute
      normalClimb: 1500,
    },
    accel: BASE_ACCEL,
  },
};
